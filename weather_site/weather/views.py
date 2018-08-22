from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, JsonResponse
from .models import City
from .forms import LocationName
from .open_weather import open_weather
from django.conf import settings
from django.db import connection
import json

settings.DEBUG = True

# Create your views here.
def del_fav(request):
    if request.method == 'POST':
        api_id = request.POST['id']

        #Check if object exists
        if (not City.objects.filter(api_id=api_id).exists()) :
            response = {'status': '400' ,'msg':'NOK'}
        else:
            city = City.objects.filter(api_id=api_id).all().delete()
            response = {'status': '200', 'msg':'OK'}

    return JsonResponse(response)

def add_fav(request):
    if request.method == 'POST':
        city_name = request.POST['name']
        api_id = request.POST['id']

        #Check if there is already a city on our database
        if (City.objects.filter(api_id=api_id).exists()) :
            response = {'status': '400' ,'msg':'NOK'}
        else:
            new_city = City(api_id=api_id, city_name=city_name)
            new_city.save()
            response = {'status': '200', 'msg':'OK'}

    return JsonResponse(response)

def index(request):
    context = {}
    if request.method == 'POST':
        
        form = LocationName(request.POST)
        if form.is_valid():
            location = form.cleaned_data['location_name']
            weather = open_weather.get_weather_from_city(location)
            context['weather'] = weather
    else:
        form = LocationName()

    context['form'] = form

    return render(request, "weather/search_page.html", context=context)

def favorite_page(request):
    favorites = City.objects.all()

    id_array = []

    for fav in favorites:
        id_array.append(str(fav.api_id))

    weather_array = open_weather.get_weather_from_many_cities(id_array)

    context = {
        'favorites': weather_array
    }
    return render(request, "weather/favorites_page.html", context=context)

def search_city_weather(request):
    context = {}
    if request.method == 'POST':
        form = LocationName(request.POST)
        if form.is_valid():
            location = form.cleaned_data['location_name']
            weather = open_weather.get_weather_from_city(location)
            context['weather'] = weather

            #Check if already a favorite
            if (City.objects.filter(api_id=weather['id']).exists()):
                print('JA EH')
                context['fav'] = True
    else:
        pass

    return render(request, "weather/info_page.html", context=context)