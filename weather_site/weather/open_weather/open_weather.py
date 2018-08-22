import requests

def get_weather_from_city(city_name):
    api_key = '39603afebd725c66d86b483fddbeac26'
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + str(city_name) +'&units=metric&APPID=' + api_key

    try:
        r = requests.get(url)
        data = convert_weather_data(r.json())
    except requests.exceptions.RequestException as e:
        print(e)

    return data

def get_weather_from_many_cities(id_array):
    api_key = '39603afebd725c66d86b483fddbeac26'
    str_id_array = ",".join(id_array)
    url = 'http://api.openweathermap.org/data/2.5/group?id=' + str_id_array +'&units=metric&APPID=' + api_key
    try:
        r = requests.get(url)
        data = convert_weather_array(r.json())
    except requests.exceptions.RequestException as e:
        print(e)

    return data

def convert_weather_array(w_array):
    converted_array = []

    for w_data in w_array['list']:
        converted_array.append(convert_weather_data(w_data))

    return converted_array

def convert_weather_data(w_data):

    converted_data = {
        'name' : w_data['name'],
        'temp' : w_data['main']['temp'],
        'temp_min' : w_data['main']['temp_min'],
        'temp_max' : w_data['main']['temp_max'],
        'desc' : w_data['weather'][0]['description'],
        'id' : w_data['id']
        
    }

    return converted_data
