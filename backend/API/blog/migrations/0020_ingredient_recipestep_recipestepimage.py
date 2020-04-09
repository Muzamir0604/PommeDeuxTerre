# Generated by Django 3.0.5 on 2020-04-07 20:03

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_auto_20200406_1012'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, null=True)),
                ('quantity', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('short_description', models.CharField(blank=True, max_length=70, null=True)),
                ('measure_unit', models.CharField(choices=[('g', 'Grams'), ('kg', 'Kilograms'), ('ml', 'Millilitre'), ('L', 'Litre'), ('tsp', 'Teaspoon'), ('tbsp', 'Tablespoon'), ('tcp', 'TeaCup')], max_length=5)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_ingredients', to='blog.Post')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeStep',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64, null=True)),
                ('description', models.TextField(max_length=120, null=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_recipes_step', to='blog.Post')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeStepImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('ingredient', models.ManyToManyField(to='blog.Ingredient')),
                ('recipe_step_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='RecipeStep_Image', to='blog.RecipeStep')),
            ],
        ),
    ]
