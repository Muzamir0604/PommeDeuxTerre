from django.test import TestCase
from django.contrib.auth import get_user_model
from core import models


def sample_user(username="bob", password="test1234"):
    """Create sample user"""
    return get_user_model().objects.create_user(username, password)


def sample_category(title="Food", description="anything foods"):
    return models.Category.objects.create(
        title=title,
        description=description
    )


def sample_post(category, user, title="Chicken Rice",
                description="descriptive"):
    return models.Post.objects.create(title=title, description=description,
                                      category=category, user=user)


def sample_review(user, post, stars=4, title="great title",
                  description="nice description",
                  ):
    return models.Review.objects.create(
        stars=stars, title=title, description=description,
        user=user, post=post)


def sample_recipe(post, name="Fish curry",
                  prep_time=10,
                  cook_time=30,
                  servings=2):
    return models.Recipe.objects.create(name=name,
                                        prep_time=prep_time,
                                        cook_time=cook_time,
                                        servings=servings,
                                        post=post)


class ModelTests(TestCase):
    """Test model validity"""

    def setUp(self):
        self.user = sample_user()
        self.category = sample_category()

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = "muzamir@gmail.com"
        password = "Testpass123"
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """
        Test the email for a new user is normalized
        """
        email = "test@BIJOE.NET"

        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test123')

    def test_create_new_superuser(self):
        """Test creating a new super user"""
        get_user_model().objects.create_superuser(
            'test@muzamir.com',
            'test123'
        )

    def test_category_str(self):
        """Test the Category string representation"""
        self.assertEqual(str(self.category), self.category.title)

    def test_post_str(self):
        """Test the Post string representation"""
        post = sample_post(user=self.user, category=self.category)
        self.assertEqual(str(post), f'{post.category}: {post.title}')

    def test_review_str(self):
        """Test the review string representation"""
        self.category.category_posts.add(sample_post(user=self.user,
                                         category=self.category))
        self.post = models.Post.objects.get(category=self.category)
        self.post.post_reviews.add(sample_review(user=self.user,
                                                 post=self.post))
        self.review = models.Review.objects.get(post=self.post)
        self.assertEqual(str(self.review),
                         f"{self.post}: {self.review.title} - {self.user}")

    def test_recipe_str(self):
        """Test the recipe string representation"""
        self.post = sample_post(user=self.user,
                                category=self.category)
        self.recipe = sample_recipe(post=self.post)
        self.assertEqual(str(self.recipe), f"{self.recipe.name}")

    def test_ingredient_str(self):
        self.post = sample_post(user=self.user,
                                category=self.category)
        self.recipe = sample_recipe(post=self.post)
        self.ingredient = models.Ingredient(
            name="Curry leaves",
            recipe=self.recipe,
            quantity=50,
            unit="cup",
        )
        self.assertEqual(str(self.ingredient), self.ingredient.name)

    def test_instructions_str(self):
        self.post = sample_post(user=self.user,
                                category=self.category)
        self.recipe = sample_recipe(post=self.post)
        self.instructions = models.Instruction(
            title="Add in the curry leaves",
            recipe=self.recipe,
        )
        self.assertEqual(str(self.instructions), self.instructions.title)

    def test_tag_str(self):
        """ Test the tag string representation"""
        tag = models.Tag.objects.create(
            user=self.user,
            name="Vegan"
        )

        self.assertEqual(str(tag), tag.name)
