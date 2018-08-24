# Teste técnico - Siteware

# Aplicação Web usando Api do OpenWeatherMap

## Instalação

### Dependencias:

Para instalar a aplicação é necessário utilizar:

- [Python 3.7](https://www.python.org/downloads/release/python-370/)
- [Pip](https://pypi.org/project/pip/)

Também é recomendado utilizar um ambiente virtual como o `virtualenv`

### Passos da instalação

1. Clone o repositório
2. Instale as dependencias com:
```
$ pip install -r requirements.txt
```
3. Entre na pasta `weather_site`
```
$ cd weather_site
```
4. Provisione o banco de dados SQLite
```
$ python manage.py makemigrations
$ python manage.py migrate
```
5. Execute a aplicação Django
```
$ python manage.py runserver
```
6. A aplicação pode ser acessada em [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Rodando os testes

Os testes unitários podem ser rodados na pasta `site_weather` executando o comando: 

```
$ python manage.py test
```


