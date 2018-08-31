# Teste técnico - Siteware

# Instruções para buildar e rodar o sistema.

 - Instalar o PHP 7.2 e suas dependências: https://tecadmin.net/install-php7-on-debian/
 - Instalar o composer: https://getcomposer.org/download/
 - Fazer o clone do projeto `git clone git@github.com:joaomantovani/siteware-teste-tecnico.git`
 - Entrar na pasta do clone `cd site-teste-tecnico`
 - Atualizar as dependências com o composer `composer update`
 - Criar o arquivo de ambiente `cp .env.example .env`
 - Gerar a chave `php artisan key:generate`
 - Iniciar o servidor local `php artisan serve`
 - Acessar a url http://127.0.0.1:8000/ ou localhost:8000 no navegador e ver a aplicação

# Aplicação Web usando Api do OpenWeatherMap

O teste consiste em criar um aplicação Web que se comunique com a [API do OpenWeatherMap](https://openweathermap.org/) para obter informações de tempo de uma determinada cidade que o usuário está buscando.

A aplicação deverá possuir os seguintes recursos:

### 1. Busca de cidades
   Eu como usuário final devo conseguir buscar a informação de tempo por nome de cidade.
### 2. Visualização de informação de tempo
   Eu como usuário final devo conseguir visualizar as informações de tempo da cidade buscada.
### 3. Criação de Favoritos
   Eu como usuário final devo conseguir favoritar a cidade para acessá-lo posteriormente.
### 4. Visualização dos favoritos
   Eu como usuário final devo conseguir visualizar de forma rápida as informações de tempo das cidades favoritadas
### 5. Remoção de favoritos
   Eu como usuário final devo conseguir remover uma cidade favoritada.

## Informações importantes:

- Você poderá usar as tecnologias que desejar. 
- A informação de favoritos deve ser salva em banco de dados.
- A entrega do projeto pode ser feita via fork/pull-request neste repositório, bem como as instruções para buildar e rodar o sistema.







