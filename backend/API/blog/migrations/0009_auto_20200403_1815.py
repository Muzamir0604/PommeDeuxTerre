# Generated by Django 3.0.4 on 2020-04-03 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_auto_20200403_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, max_length=360, null=True),
        ),
    ]