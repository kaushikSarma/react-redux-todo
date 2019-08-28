## A simple implementation of todo-list using react and redux
You can test the app [here](https://kaushiksarma.github.io/react-redux-todo/)

### To run the app:
#### Using webpack-dev-server
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

#### Using node server with https
> you willl need to generate and copy tls certificate to ./certificates directory
> for https server to work.

1. Clone the repository
2. > to generate tls certificate using openssl run the following
> `mkdir <path-to-repo>/certificate && cd <path-to-repo>/certificates`
> `openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem` 
3. Run `npm install`
4. Run `npm run serve`