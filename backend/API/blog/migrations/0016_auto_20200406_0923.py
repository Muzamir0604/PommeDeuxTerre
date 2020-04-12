# Generated by Django 3.0.5 on 2020-04-06 07:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_postimage'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postimage',
            old_name='file',
            new_name='image',
        ),
        migrations.AddField(
            model_name='postimage',
            name='post_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='blog.Post'),
        ),
    ]