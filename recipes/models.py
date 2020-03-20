from django.core.validators import MinValueValidator
from django.conf import settings
from django.db import models


class Recipe(models.Model):
    TYPE_CHOICES = [
        ('BKFST', 'Breakfast'),
        ('LNCH', 'Lunch'),
        ('DIN', 'Dinner'),
        ('DSSRT', 'Dessert'),
    ]

    COOK_SCALE_CHOICES = [
        ('F', 'Farenheit'),
        ('C', 'Celsius'),
    ]

    name = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    is_public = models.BooleanField(default=False)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    prep_time = models.IntegerField(validators = [MinValueValidator(0)])
    cook_time = models.IntegerField(validators = [MinValueValidator(0)])
    cook_temp = models.IntegerField()
    cook_scale = models.CharField(max_length=10, choices=COOK_SCALE_CHOICES)
    amount = models.IntegerField(validators = [MinValueValidator(0)])
    unit = models.CharField(max_length=255)
    personal_notes = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='recipes/', null=True)
    steps = models.TextField(null=True)

    def __str__(self):
        return self.name[:50]
