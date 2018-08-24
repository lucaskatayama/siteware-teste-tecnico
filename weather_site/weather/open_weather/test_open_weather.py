from django.test import TestCase
from .open_weather import Open_Weather
from ..weather_constants import weather_constants as WC
from django.conf import settings
from unittest import mock
import requests

API_KEY = settings.API_KEY

SUCCESS_API_RESPONSE = {
    WC.KEY_NAME:'London',
    WC.KEY_ID: 42,
    WC.KEY_MAIN:{
        WC.KEY_TEMPERATURE:0,
        WC.KEY_MIN_TEMPERATURE:0,
        WC.KEY_MAX_TEMPERATURE:0,
    },
    WC.KEY_WEATHER:[{
        WC.KEY_DESCRIPTION:'foo'
    }]
}

SUCCESS_API_GROUP_RESPONSE = {WC.KEY_LIST:[{
    WC.KEY_NAME:'London',
    WC.KEY_ID: 123,
    WC.KEY_MAIN:{
        WC.KEY_TEMPERATURE:0,
        WC.KEY_MIN_TEMPERATURE:0,
        WC.KEY_MAX_TEMPERATURE:0,
    },
    WC.KEY_WEATHER:[{
        WC.KEY_DESCRIPTION:'foo'
    }]
},{
    WC.KEY_NAME:'New York',
    WC.KEY_ID: 456,
    WC.KEY_MAIN:{
        WC.KEY_TEMPERATURE:0,
        WC.KEY_MIN_TEMPERATURE:0,
        WC.KEY_MAX_TEMPERATURE:0,
    },
    WC.KEY_WEATHER:[{
        WC.KEY_DESCRIPTION:'foo'
    }]
}]}

FAILED_API_RESPONSE = {
    WC.ERROR_STATUS: 404,
    WC.ERROR_MSG: 'not_found'
}

class Mock_Response:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code
        self.content = json_data

    def json(self):
        return self.json_data

# View Tests
class OpenWeatherTestCase(TestCase):
    def setUp(self):
        self.ow = Open_Weather()

    def mock_request(*args, **kwargs):

        right_basic_url = WC.CITY_WEATHER_URL.format('London', API_KEY)
        right_group_url = WC.CITY_BLOCK_URL.format('123,456', API_KEY)
        if args[0] == right_basic_url:
            response = Mock_Response(SUCCESS_API_RESPONSE, 200)
        elif args[0] == right_group_url:
            response = Mock_Response(SUCCESS_API_GROUP_RESPONSE, 200)
        else:
            response = Mock_Response('not_found', 404)

        return response

    @mock.patch('requests.get', side_effect=mock_request)
    def test_success_basic_search(self, mock_get):
        response = self.ow.get_weather_from_city('London')

        expected = {
            WC.KEY_NAME : 'London',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 42
        }

        self.assertEqual(expected, response)

    @mock.patch('requests.get', side_effect=mock_request)
    def test_failed_basic_search(self, mock_get):
        response = self.ow.get_weather_from_city('XPO%#@')

        self.assertEqual(FAILED_API_RESPONSE, response)

    @mock.patch('requests.get', side_effect=mock_request)
    def test_success_group_search(self, mock_get):
        response = self.ow.get_weather_from_many_cities(['123','456'])

        expected = [{
            WC.KEY_NAME : 'London',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 123
        },{
            WC.KEY_NAME : 'New York',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 456
        }]

        self.assertEqual(expected, response)

    def test_convert_weather_data(self):
        response = self.ow.convert_weather_data(Mock_Response(SUCCESS_API_RESPONSE, 200).json())
        
        expected = {
            WC.KEY_NAME : 'London',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 42
        }

        self.assertEqual(expected, response)

    def test_convert_weather_array(self):
        response = self.ow.convert_weather_array(Mock_Response(SUCCESS_API_GROUP_RESPONSE, 200).json())
        
        expected = [{
            WC.KEY_NAME : 'London',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 123
        },{
            WC.KEY_NAME : 'New York',
            WC.KEY_TEMPERATURE : 0,
            WC.KEY_MIN_TEMPERATURE : 0,
            WC.KEY_MAX_TEMPERATURE : 0,
            WC.KEY_DESCRIPTION : 'foo',
            WC.KEY_ID : 456
        }]

        self.assertEqual(expected, response)
        

    
