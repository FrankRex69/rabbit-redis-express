<p align="center">
  Basic project with: 
  - Nodejs - Typescript - Redis
</p>

## Description
```bash
[ Basic project Rabbit-Redis-Express ](https://github.com/FrankRex69/rabbit-redis-express)

Web app sends long url and account and response with short url.
Web app sends short url, find long url and number call back.

src/index.ts --> server web + handler form
src/utils_rabbit.ts --> handler RabbitMq
src/redis.ts --> handler Redis
src/utils.ts --> classes of Redis
```
## Installation backend/frontend

```bash
$ npm install
```

## Running the app
```bash
# Docker (in root)
$ docker-compose up
## stop Docker
$ docker stop $(docker ps -a -q)
## remove Docker
$ docker rm $(docker ps -a -q)

## Start app
$ npm run start
```
## Use the app
```bash
In http://localhost:3000/form use fields the form received in the terminal:
1) longUrl + account ---> shortUrl
2) shortUrl ---> longUrl and number callback shortUrl
```
