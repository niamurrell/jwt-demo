# JWT Demo

## Node/Express Server

This app demonstrates how to implement a `/signup` and `/login` route using JSON web tokens, as well as how to protect selected routes using middleware. It is based on the YouTube tutorial [JWT Authentication with Node Crash Course - 2021](https://www.youtube.com/watch?v=6ZCU4QetVTs) (and its [repo](https://github.com/harblaith7/JWT-Crash-Course)).

A `.env` file will need to be created in the root directory following the `.env.default` template. The value of `JWT_SECRET` should be set to a complex string.

Endpoints can be tested using the `endpoints.test.rest` file using VS Code with the **REST Client** extension installed.