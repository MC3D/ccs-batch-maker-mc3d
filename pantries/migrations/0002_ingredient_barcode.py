# Generated by Django 3.0.4 on 2020-03-24 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pantries', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='barcode',
            field=models.CharField(default='123', max_length=255),
            preserve_default=False,
        ),
    ]
