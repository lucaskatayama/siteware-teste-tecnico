from django.urls import path

from . import views

urlpatterns = [
    path(r'', views.index, name='index'),
    path(r'search_weather', views.search_city_weather, name='search_city_weather'),
    path(r'add_fav', views.add_fav, name='save_fav'),
    path(r'del_fav', views.del_fav, name='del_dav'),
    path(r'favorites', views.favorite_page, name='favorite_pages')
]