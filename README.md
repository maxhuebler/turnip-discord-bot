# Turnip Stalk Bot
Helper chatbot for displaying turnip prices of all users in a server

This discord bot came from the idea, to alleviate the need to ask all my friends twice a day for their current prices.

### How it works
The working procedure is crudely described below:
- Users tell bot their current price of turnips.
- Users ask the bot to display everyone's current turnip price.
- Fetches relevant data from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sends it back to the server channel.

### How to set up
#### 1. Get needed enviroment variables
Before deploying you will need to set some environment variables corresponding to some API configurations
1. `TOKEN` : The Discord bot application token
2. `MONGODB_URI` : The MongoDB atlas connection string

You can store these variables in a file named ```.env``` inside your root project directory.

#### 2. Deploy server
I personally used [heroku](https://heroku.com/) since it was free and I didn't have many concurrent users.

```
yarn app.js
```

For heroku there is a Procfile that tells the dyno to spin up using a worker instead of web process type.
