from django.db import models


class Pantry(models.Model):
    pass


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=255)

    def __str__(self):
        return self.name[:50]
