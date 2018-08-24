from django.test import TestCase
from .error_handler import Error_Handler
from ..weather_constants import weather_constants as WC

# View Tests
class ErrorHandlerTestCase(TestCase):
    def setUp(self):
        self.handler = Error_Handler()

    def test_default_handler(self):
        error_data = {WC.ERROR_STATUS:500, WC.ERROR_MSG: 'foo_error'}

        expected_response = {WC.ERROR_TEMPLATE : 'error/default_error.html', WC.ERROR_MSG : 'foo_error'}
        error_response = self.handler.handle(error_data)
        self.assertEqual(error_response, expected_response)

    def test_not_found_handler(self):
        error_data = {WC.ERROR_STATUS:404, WC.ERROR_MSG: 'foo_error'}

        expected_response = {WC.ERROR_TEMPLATE : 'error/error_not_found.html', WC.ERROR_MSG : '404 NOT FOUND!'}
        error_response = self.handler.handle(error_data)
        self.assertEqual(error_response, expected_response)

    def test_build_error_context(self):
        template = 'foo.html'
        msg = 'bar'

        expected_result = {WC.ERROR_TEMPLATE : template, WC.ERROR_MSG : msg}
        result = self.handler.build_error_context(template, msg)

        self.assertEqual(result, expected_result)
    
