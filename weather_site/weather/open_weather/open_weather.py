import requests
from django.conf import settings
from ..weather_constants import weather_constants as WC

class Open_Weather:
    
    def __init__(self):
        self.api_key = settings.API_KEY

    def get_weather_from_city(self, city_name):
        '''
            Makes an API call to the Open Weather to get weather info from
            a city
            
            Input:
                city_name: Name of the city that will be queried

            Output:
                Dictionary containing weather info
        '''
        url = WC.CITY_WEATHER_URL.format(str(city_name), self.api_key)
        r = requests.get(url)

        if r.status_code == WC.STATUS_CODE_OK:
            data = self.convert_weather_data(r.json())
        else:
            data = {
                WC.ERROR_STATUS: r.status_code,
                WC.ERROR_MSG: r.content
            }

        return data

    def get_weather_from_many_cities(self, id_array):
        '''
            Makes an API call to the Open Weather to get weather info from
            an array of cities
            
            Input:
                id_array: List containing all the cities id that will be queried

            Output:
                List with dictionarys containing weather info
        '''
        str_id_array = ",".join(id_array)
        url = WC.CITY_BLOCK_URL.format(str_id_array, self.api_key)
        r = requests.get(url)
        
        if r.status_code == WC.STATUS_CODE_OK:
            data = self.convert_weather_array(r.json())
        else:
            data = {
                WC.ERROR_STATUS: r.status_code,
                WC.ERROR_MSG: r.content
            }

        return data

    def convert_weather_array(self, w_array):
        '''
            Converts data from an array of Open Weather API responses to a list of
            dicts used by the templates
            Input:
                w_array: Parsed JSON array from the Open Weather API

            Output:
                List with dictionarys containing weather info
        '''
        converted_array = []

        for w_data in w_array[WC.KEY_LIST]:
            converted_array.append(self.convert_weather_data(w_data))

        return converted_array

    def convert_weather_data(self, w_data):
        '''
            Converts data from a Open Weather API response to a dict used by the templates
            Input:
                w_data: Parsed JSON from the Open Weather API

            Output:
                Dictionary with weather info
        '''
        converted_data = {
            WC.KEY_NAME : w_data[WC.KEY_NAME],
            WC.KEY_TEMPERATURE : w_data[WC.KEY_MAIN][WC.KEY_TEMPERATURE],
            WC.KEY_MIN_TEMPERATURE : w_data[WC.KEY_MAIN][WC.KEY_MIN_TEMPERATURE],
            WC.KEY_MAX_TEMPERATURE : w_data[WC.KEY_MAIN][WC.KEY_MAX_TEMPERATURE],
            WC.KEY_DESCRIPTION : w_data[WC.KEY_WEATHER][0][WC.KEY_DESCRIPTION],
            WC.KEY_ID : w_data[WC.KEY_ID]
            
        }
        return converted_data
