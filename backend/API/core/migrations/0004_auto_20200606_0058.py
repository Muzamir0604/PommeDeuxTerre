# Generated by Django 3.0.7 on 2020-06-05 22:58

import core.models
from django.db import migrations
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20200605_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format='PNG', keep_meta=True, null=True, quality=75, size=[320, 236], upload_to=core.models.recipe_image_file_path),
        ),
    ]
