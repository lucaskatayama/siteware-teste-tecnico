from django.test import TestCase
from . import views
from weather.models import City
from .open_weather import open_weather

# View Tests
class CityTestCase(TestCase):
    def setUp(self):
        self.setDatabase()

    def setDatabase(self):
        City.objects.create(api_id=42, city_name='Gondor')
        City.objects.create(api_id=13, city_name='Beach City')

    def resetDatabase(self):
        City.objects.all().delete()
        self.setDatabase()

    def test_success_del_fav(self):
        self.client.post('/del_fav', {'id':42})

        self.assertEqual(len(City.objects.all()), 1)
        self.assertFalse(City.objects.filter(api_id=42).exists())

    def test_failed_del_fav(self):
        self.client.post('/del_fav', {'id':0})

        self.assertEqual(len(City.objects.all()), 2)
        self.assertTrue(City.objects.filter(api_id=42).exists())

    def test_success_add_fav(self):
        self.client.post('/add_fav', {'id':17,'name':'Bespin'})

        self.assertEqual(len(City.objects.all()), 3)
        self.assertTrue(City.objects.filter(api_id=17).exists())
        self.assertTrue(City.objects.filter(city_name='Bespin').exists())

    def test_failed_add_fav(self):
        self.client.post('/add_fav', {})

        self.assertEqual(len(City.objects.all()), 2)

