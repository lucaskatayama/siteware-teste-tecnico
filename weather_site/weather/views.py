from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, JsonResponse
from .models import City
from .forms import LocationName
from .weather_constants import weather_constants as WC
from .open_weather import open_weather, error_handler
import json

#Initialize open weather class
op_w = open_weather.Open_Weather()

#Initialize error_handler class
er_handler = error_handler.Error_Handler()

# Create your views here.
def del_fav(request):
    if request.method == 'POST':
        try:
            api_id = request.POST[WC.KEY_ID]
        except:
            response = {WC.RESPONSE_STATUS : WC.STATUS_CODE_BAD_REQUEST, WC.RESPONSE_MSG:'NOK'}
            return JsonResponse(response)

        #Check if object exists
        if (not City.objects.filter(api_id=api_id).exists()) :
            response = {WC.RESPONSE_STATUS : WC.STATUS_CODE_BAD_REQUEST, WC.RESPONSE_MSG:'NOK'}
        else:
            City.objects.filter(api_id=api_id).all().delete()
            response = {WC.RESPONSE_STATUS: WC.STATUS_CODE_OK, WC.RESPONSE_MSG:'OK'}

    return JsonResponse(response)

def add_fav(request):
    if request.method == 'POST':
        try:
            city_name = request.POST[WC.KEY_NAME]
            api_id = request.POST[WC.KEY_ID]
        except:
            response = {WC.RESPONSE_STATUS : WC.STATUS_CODE_BAD_REQUEST, WC.RESPONSE_MSG:'NOK'}
            return JsonResponse(response)

        #Check if there is already a city on our database
        if (City.objects.filter(api_id=api_id).exists()) :
            response = {WC.RESPONSE_STATUS: WC.STATUS_CODE_BAD_REQUEST, WC.RESPONSE_MSG:'NOK'}
        else:
            new_city = City(api_id=api_id, city_name=city_name)
            new_city.save()
            response = {WC.RESPONSE_STATUS: WC.STATUS_CODE_OK, WC.RESPONSE_MSG:'OK'}

    return JsonResponse(response)

def index(request):
    context = {}
    if request.method == 'POST':
        form = LocationName(request.POST)
        if form.is_valid():
            location = form.cleaned_data[WC.KEY_LOCATION_NAME]
            weather = op_w.get_weather_from_city(location)
            context[WC.KEY_WEATHER] = weather
    else:
        form = LocationName()

    context[WC.TEMPKEY_FORM] = form

    return render(request, "weather/search_page.html", context=context)

def favorite_page(request):
    favorites = City.objects.all()
    context = {}
    id_array = []

    for fav in favorites:
        id_array.append(str(fav.api_id))

    #Get weather from all the favorites
    if len(favorites) > 0:
        weather_array = op_w.get_weather_from_many_cities(id_array)
        context[WC.TEMPKEY_FAVORITE] = weather_array

    return render(request, "weather/favorites_page.html", context=context)

def search_city_weather(request):
    context = {}
    if request.method == 'POST':
        form = LocationName(request.POST)
        if form.is_valid():
            location = form.cleaned_data[WC.KEY_LOCATION_NAME]
            weather = op_w.get_weather_from_city(location)

            #Check if request was valid
            if not WC.ERROR_STATUS in weather:
                context[WC.KEY_WEATHER] = weather
                #Check if already a     favorite
                if (City.objects.filter(api_id=weather[WC.TEMPKEY_ID]).exists()):
                    context[WC.TEMPKEY_FAV_BOOL] = True
            else:
                #Handles the error
                error = er_handler.handle(weather)
                context[WC.KEY_ERROR] = error[WC.ERROR_MSG]
                return render(request, error[WC.ERROR_TEMPLATE], context)

    else:
        error_data = {WC.ERROR_STATUS: WC.STATUS_CODE_BAD_REQUEST, WC.ERROR_MSG: 'Bad Request'}
        error = er_handler.handle(error_data)
        context[WC.KEY_ERROR] = error[WC.ERROR_MSG]
        return render(request, error[WC.ERROR_TEMPLATE], context)

    return render(request, "weather/info_page.html", context=context)