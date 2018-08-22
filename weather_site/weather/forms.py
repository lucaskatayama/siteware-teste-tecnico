from django import forms

class LocationName(forms.Form):
    location_name = forms.CharField(label='Location Name', max_length=100)