# Generated by Django 3.0.4 on 2020-03-09 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_recipe_cook_temp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='cook_temp',
            field=models.IntegerField(),
        ),
    ]
