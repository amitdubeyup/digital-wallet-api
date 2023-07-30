# Wallet App

  The project "Wallet App" is an app for showing the user & their wallet transaction details. In this app, the user can register & log in, after login home page will be open, where he can view his wallet balance, and transaction & can create credit/debit transactions.
  
### Live URL: https://wallet-41nv.onrender.com/


## Tech Stack

  1. NodeJS (Version: 14+)
  2. ExpressJS (Version: 4+)
  3. VueJS & Vite (Version: 4+)
  4. MongoDB & Mongoose (Version: 5+)


## Quick Start

Clone the repository:

```bash
$ git clone https://github.com/amitdubeyup/wallet
```

Goto project directory:

```bash
$ cd wallet
```

Install dependencies:

```bash
$ npm install
```

Start the app:

```bash
$ npm start
```

  View the app at: http://localhost:3000



## REST API

  There is two part to REST APIs,

  1. User Details

  2. Wallet Details

  The REST APIs to the wallet app are described below.

## Login User

```bash
  Method: POST
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/user/login
  Body: {
    "email": "amitdubey88@gmail.com",
    "password": "7610002325"
  }
  Response: {
    "success": true,
    "message": "Logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```

## Register User

```bash
  Method: POST
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/user/register
  Body: {
    "name": "Amit Dubey",
    "email": "amitdubey88@gmail.com",
    "mobile": "7610002325",
    "password": "7610002325"
  },
  Response: {
    "success": true,
    "message": "User registered successfully."
  }
 ```

## Fetch Balance

```bash
  Method: GET
  Header: { content-type: application/json, token: token }
  URL: http://localhost:3000/api/wallet/balance/${user_id}
  Response: {
    "success": true,
    "message": "Balance fetched successfully.",
    "data": {
      "balance": 200
    }
  }
 ```

## Fetch Transactions

```bash
  Method: GET
  Header: { content-type: application/json, token: token }
  URL: http://localhost:3000/api/wallet/transactions/${user_id}?skip=0&limit=10&filter=1,
  Response: {
    "success": true,
    "message": "Transactions fetched successfully.",
    "data": {
      "have_prev": false,
      "have_next": true,
      "transactions": [
        {
          "amount": 100,
          "type": "credit",
          "balance": 300,
          "description": "Wallet Credited",
          "_id": "64c62c7caa6f6e4e0b3a86cf",
          "created_at": "2023-07-30T09:25:16.742Z"
        },
      ]
    }
  }
 ```

## Create Transactions

```bash
  Method: POST
  Header: { content-type: application/json, token: token }
  URL: http://localhost:3000/api/wallet/transaction/${user_id}
  Body: {
    "amount": "100",
    "type": "credit",
    "description": "Wallet Credit"
  }
  Response: {
    "success": true,
    "message": "Wallet credited successfully."
  }
 ```


## People

The lead maintainer is [Amit Dubey](https://github.com/amitdubeyup)

## License

  [MIT](LICENSE)
