from rest_framework.renderers import JSONRenderer
import json


class CustomJsonRender(JSONRenderer):

    format = 'json'
    charset = 'UTF-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):

        if renderer_context:
            # response = renderer_context['response']
            # code = response.status_code
            # response.status_code = 201
            res = {
                'success': 1,
                'file': data,
            }
            # return json.dumps(
            #     res, cls=self.encoder_class,
            #     indent=4, ensure_ascii=self.ensure_ascii,
            #     allow_nan=not self.strict
            # )
            return super().render(res, accepted_media_type, renderer_context)
        else:
            return super().render(data, accepted_media_type, renderer_context)
