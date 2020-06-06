from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.filters import SearchFilter
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend


from core.models import Post, Review, Category, PostImage
from .serializers import PostSerializer, ReviewSerializer, CategorySerializer,\
    ImageSerializer, ImageOnlySerializer


# https://stackoverflow.com/questions/59451364/multiple-file-upload-with-reactjs
# https://stackoverflow.com/questions/52903232/how-to-upload-multiple-images-using-django-rest-framework
# https://stackoverflow.com/questions/52389956/uploading-multiple-files-using-django-rest-framework-without-using-forms


def modify_input_for_multiple_files(post_id, image):
    dict = {}
    dict['post_id'] = post_id
    dict['image'] = image
    return dict


def modify_input(image):
    dict = {}
    # dict['post_id'] = post_id
    dict['image'] = image
    return dict


class ImageUploadOnly(views.APIView):
    parser_class = (MultiPartParser, FormParser)
    renderer_classes = [JSONRenderer]
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        images = dict((request.data).lists())['image']
        flag = 1
        arr = []
        for img_name in images:
            modified_data = modify_input(
                img_name)
            file_serializer = ImageOnlySerializer(
                data=modified_data, context={"request": request})

            if file_serializer.is_valid():
                file_serializer.save()
            else:
                flag = 0

        res = {"success": 1, "file": {
            "url": file_serializer.data['image']}}

        if flag == 1:
            return Response(res)
        else:
            return Response(arr, status=status.HTTP_400_BAD_REQUEST)


class ImageUploadView(views.APIView):
    parser_class = (MultiPartParser, FormParser)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        all_images = PostImage.objects.all()
        serializer = ImageSerializer(all_images, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, *args, **kwargs):
        post_id = request.data['post_id']
        # converts querydict to original dict
        images = dict((request.data).lists())['image']
        flag = 1
        arr = []
        for img_name in images:
            modified_data = modify_input_for_multiple_files(post_id,
                                                            img_name)
            file_serializer = ImageSerializer(data=modified_data)
            if file_serializer.is_valid():
                file_serializer.save()
                arr.append(file_serializer.data)
            else:
                flag = 0

        if flag == 1:
            return Response(arr, status=status.HTTP_201_CREATED)
        else:
            return Response(arr, status=status.HTTP_400_BAD_REQUEST)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    authentication_classes = (TokenAuthentication,)
    filterset_fields = ['category', 'user']
    search_fields = ['title', 'description',
                     'category__title', 'user__email', 'post_recipes__name','tags__name']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        """ Instatiates and returns a list of permissions"""
        if self.action == 'review_post' or self.action == 'review_update':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == "review_post"\
           or self.action == "review_update":
            return ReviewSerializer
        return PostSerializer

    @action(detail=True, methods=['GET'])
    def reviews(self, request, pk=None):
        post = Post.objects.get(id=pk)
        try:
            reviews = Review.objects.filter(post=post.id)
            serializer = ReviewSerializer(reviews, many=True)
            response = {'reviews': serializer.data}
            return Response(response, status=status.HTTP_200_OK)
        except ValueError:
            response = {'message': "Error in retrieving Reviews"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET'])
    def user_review(self, request, pk=None):
        user = request.user
        post = Post.objects.get(id=pk)
        try:
            reviews = Review.objects.filter(post=post.id, user=user.id)
            serializer = ReviewSerializer(reviews, many=True)
            response = []
            if not serializer.data:
                response = {'user_review': [
                    {"id": 0, "title": "", "description": "", "stars": 4}]}
            else:
                response = {'user_review': serializer.data}
            return Response(response, status=status.HTTP_200_OK)
        except ValueError:
            response = {'message': "Error in retrieving user Review"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'],
            authentication_classes=(TokenAuthentication,))
    def review_post(self, request, pk=None):
        if 'stars' in request.data:
            post = Post.objects.get(id=pk)
            stars = request.data['stars']
            title = request.data['title']
            description = request.data['description']
            user = request.user
            review = Review.objects.create(
                user=user, post=post, stars=stars, title=title,
                description=description)
            serializer = self.get_serializer(review, many=False)
            response = {'message': 'Review created',
                        'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)

        else:
            response = {
                'message': 'You need to provide stars, title or description'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['PUT', 'PATCH'],
            authentication_classes=(TokenAuthentication,))
    def review_update(self, request, pk=None):
        post = Post.objects.get(id=pk)
        user = request.user

        review = Review.objects.get(
            user=user, post=post)
        if 'stars' in request.data:
            review.stars = request.data['stars']
        if 'title' in request.data:
            review.title = request.data['title']
        if 'description' in request.data:
            review.description = request.data['description']

        serializer = self.get_serializer(review, many=False)
        response = {'message': 'Review updated',
                    'result': serializer.data}
        return Response(response, status=status.HTTP_200_OK)


class ReviewAPIViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post', 'user']

    # to overwrite the create and update function of viewset hence
    # restricting use
    def get_permissions(self):
        """Instantiates and returns the list
        of permissions the list requires"""
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        response = {'message': 'you can\'t update like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'you can\'t create like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    permission_classes = (AllowAny,)
