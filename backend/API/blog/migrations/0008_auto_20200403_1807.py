# Generated by Django 3.0.4 on 2020-04-03 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_auto_20200317_1747'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(max_length=360, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='blog.Category'),
        ),
        migrations.AlterField(
            model_name='post',
            name='description',
            field=models.TextField(default='description', max_length=360),
        ),
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(default='title', max_length=32),
        ),
    ]
