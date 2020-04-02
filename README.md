# Turnip Discord Bot
Helper chatbot for displaying useful information such as turnip prices, native fruit, fish and bug prices, seasonality, availability, and location to all users in the server

This discord bot came from the idea, to alleviate the need to ask all my friends twice a day for their current prices.

### How it works
The working procedure is crudely described below:
- Users tell bot their current price of turnips.
- Users ask the bot to display everyone's current turnip price.
- Users can use other commands to help easily display information for catching bugs and fishes.
- Fetches relevant data from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sends it back to the server channel.

### Commands
```
!buying <price>
!fruit <fruit>
!shells <price>
!request <highest | username>
!fish <month> <location | price | time>
!bugs <month> <location | price | time>
```

### How to set up
#### 1. Get needed environment variables
You will need to set some environment variables corresponding to some API configurations
1. `TOKEN` : The Discord bot application token
2. `MONGODB_URI` : The MongoDB atlas connection string
3. `TZ` : Timezone variable that should be set wherever your main user base is e.g (America/New_York)

You can store these variables in a file named ```.env``` inside your root project directory.

#### 2. Importing data
Before deploying you will have to import the data json files into MongoDB for your relevant hemisphere.
You can use ```mongoimport``` to make this task easy:
```
mongoimport --uri "mongodb+srv://{username}:{password}@{database}" --collection {fishes/bugs} --drop --jsonArray ./data/{north|south}/{fish/bug}.json
```

#### 3. Deploy server
I personally used [heroku](https://heroku.com/) since it was free and I didn't have many concurrent users.

```
yarn app.js
```

With Heroku we're using an addon called Heroku Scheduler that allows us to call ```node reset-bell-count.js``` every 12 hours to reset everyone's bell count in the database.

For heroku there is a Procfile that tells the dyno to spin up using a worker instead of web process type.
