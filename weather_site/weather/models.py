from django.db import models

# Create your models here.
class City(models.Model):
    api_id = models.IntegerField(default=0)
    city_name = models.CharField(max_length=200)
