from ..weather_constants import weather_constants as WC

class Error_Handler():
    def __init__(self):
        self.handlers = {
            '404': self.handle_not_found,
        }

    def handle(self, error_data):
        error_code = str(error_data[WC.ERROR_STATUS])
        error_msg = str(error_data[WC.ERROR_MSG])

        if error_code in self.handlers:
            handle_method = self.handlers[error_code]
        else:
            handle_method = self.default_handler
        
        return handle_method(error_msg)

    def build_error_context(self, template, msg):
        return {
            WC.ERROR_TEMPLATE : template,
            WC.ERROR_MSG : msg
        }

    def handle_not_found(self, error_msg):
        result = self.build_error_context('error/error_not_found.html','404 NOT FOUND!')
        return result
    
    def default_handler(self, error_msg):
        result = self.build_error_context('error/default_error.html', error_msg)
        return result