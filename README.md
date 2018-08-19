# Client

To start client, first install dependencies `cd client && npm i` than you can run `npm run start` to start in development mode or `npm run serve` to build and serve this client.

You should be able to see client at `http://localhost:8080`

# API

## Install

To start API run command below from root folder

`docker-compose up -d`

To enter API container run the command below

`docker exec -ti siteware-test_server_1 /bin/bash`

Where `siteware-test_server_1` is the container name.

Inside the container run you can run `go test github.com/diegoprates/siteware-test/server/favorites`

to run tests. You can also run the same command with `--cover` to see coverage.

## Endpoints

## **/favorites**

Get all favorites

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content**

```json
[
  {
    "id": 3447259
  },
  {
    "id": 3447258
  }
]
```

---

## **/favorites**

Create a new favorite

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `{"id": 1234567}`

- **Success Response:**

  - **Code:** 201 <br />

  ***

## **/favorites/:id**

Delete favorite based on favorite ID

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[int]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
