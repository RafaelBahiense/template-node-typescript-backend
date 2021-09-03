# Template NodeJs Typescript BackEnd
### Project WIP. 


## About

This Starter Kit Template can be the foundation of a TypeScript & TypeORM Node.js Backend 
Below are the implemented features:

- Sign Up
- Login
- Auth Middlewares
- Routes testing
- Logging
- Heroku deploy ready

## Technologies


### The following tools and frameworks were used in the construction of the project:
|NodeJS|ExpressJS|TypeScript|TypeORM|
|-|-|-|-|
|[<p align="center"><img alt="Node" width="70px" src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" /></p>][node]|[<p align="center"><img alt="Express" width="120px" src="https://cdn.worldvectorlogo.com/logos/express-109.svg" /></p>][express]|[<p align="center"><img alt="Typescript" width="60px" src="https://static.cdnlogo.com/logos/t/96/typescript.svg" /></p>][typescript]|[<p align="center"><img alt="TypeOrm" width="110px" src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" /></p>][typeorm]|
|Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine|Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications|TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions|TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8)|


[node]: https://nodejs.org/en/
[express]: https://expressjs.com/
[typescript]: https://www.typescriptlang.org/
[typeorm]: https://typeorm.io/

## How to run

1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Create a PostgresSQL database "your_database_dev" and "your_database_test"
4. rename `example.local.dev.env` -> `local.dev.env` and `example.local.test.env` -> `local.test.env`
5. Config .env files as indicated
6. Run the Backend with
```bash
npm run dev
```
10. Finally access http://localhost:4000/api/"desired-route" on your favorite API Client
___

## License
This sample application is licensed under the BSD-3-Clause License, Revised version. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [BSD-3-Clause License, Revised version](https://www.freebsd.org/internal/software-license/).
