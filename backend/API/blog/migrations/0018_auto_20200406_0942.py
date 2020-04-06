# Generated by Django 3.0.5 on 2020-04-06 07:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0017_postimage_thumbnail_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='post_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='post_images', to='blog.Post'),
        ),
    ]
