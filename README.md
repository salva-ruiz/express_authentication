# express_authentication

A example of user authentication using cookies in Javascript with
[ExpressJs](https://github.com/expressjs/express).

## Download the source code

You can get the source code of this repository by cloning it with the next
command:

`git clone https://github.com/salva-ruiz/express_authentication`

## Install dependencies

Install all dependencies with the command:

`npm install`

## Run the server

To start the server execution, run:

`npm start`

## Test with curl

[Curl](https://github.com/curl/curl) is a powerful HTTP client that we can use
to test our server.

1. First, we can check that the server responds correctly:
```
curl http://localhost:8000
```

2. If we try to get a prohibited content we get an error:
```
curl http://localhost:8000/private -b cookies.txt
```

3. Now, we are going to log in:
```
curl -H "Content-Type: application/json" -d '{"username": "user", "password": "pass"}' http://localhost:8000/login -c cookies.txt
```

4. Now, we can access the private content:
```
curl http://localhost:8000/private -b cookies.txt
```

5. After that, we are going to log out:
```
curl -X POST http://localhost:8000/logout -c cookies.txt
```

6. And we can see that the private content becomes inaccessible again:
```
curl http://localhost:8000/private -b cookies.txt
```
