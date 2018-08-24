from django import forms

class LocationName(forms.Form):
    location_name = forms.CharField(label='City Name', max_length=100)