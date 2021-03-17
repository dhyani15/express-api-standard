# Boss Machine

## Project Overview

In this project, I have created an entire API to serve information to a Boss Machine, a management application for today's most accomplished (evil) entrepreneurs. Overall I created routes to manage so called 'minions', my brilliant 'million dollar ideas', and to handle all the annoying meetings that keep getting added to my busy schedule.

This project was created while I was learning Backend development at Codecademy and my objective was to test my knowledge on how to create an API.

You can view a video demonstration of the final app here:

<video width="100%" height="100%" controls>
   <source src="https://s3.amazonaws.com/codecademy-content/programs/build-apis/solution-videos/BossMachine480.mov" type="video/mp4">
 The markdown processor does not support the video tag.
</video>

## How to Begin

To start, download the repository for this project. Once you have the project downloaded, you'll need to run some terminal commands to get the application started. First, open the root project directory in your terminal. 

Run `npm install` to install the dependencies of this project and build the front-end application. Once it has finished installing, you can run `npm run start` to begin your server. You'll see `Server listening on port 4001` in the terminal. 

The `npm run start` script will automatically restart your server whenever you make changes to the **server.js** file or **server/** folder. If you want to turn this off, simply start your server with the `node server.js` command. You can kill either process with the `Ctrl + C` command.

Now simply open **index.html** in a web browser.

## Implementation Details

I have built the backend using express framework, and using the following middlewares `body-parser` & `cors`.

### API Routes

- All the routes live inside the **server** folder.
- The 'database' exists in **server/db.js**. The beginning database will be seeded every time the server is restarted. There is more information on working with the database and the helper functions it exports below.

#### Routes Required

- `/api/minions`
  - GET /api/minions to get an array of all minions.
  - POST /api/minions to create a new minion and save it to the database.
  - GET /api/minions/:minionId to get a single minion by id.
  - PUT /api/minions/:minionId to update a single minion by id.
  - DELETE /api/minions/:minionId to delete a single minion by id.
- `/api/ideas`
  - GET /api/ideas to get an array of all ideas.
  - POST /api/ideas to create a new idea and save it to the database.
  - GET /api/ideas/:ideaId to get a single idea by id.
  - PUT /api/ideas/:ideaId to update a single idea by id.
  - DELETE /api/ideas/:ideaId to delete a single idea by id.
- `/api/meetings`
  - GET /api/meetings to get an array of all meetings.
  - POST /api/meetings to create a new meeting and save it to the database.
  - DELETE /api/meetings to delete _all_ meetings from the database.

For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.

For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.

### Working with the 'Database'

The **server/db.js** file exports helper functions for working with the database arrays. The goal of this project is for you to focus on Express routes and not worry about how the database works under the hood. These functions always take at least one argument, and the first argument is always a string representing the name of the database model: `'minions'`, `'ideas'`, `'meetings'`, or `'work'`.

`getAllFromDatabase`:

- Takes only the single argument for model name. Returns the array of elements in the database or `null` if an invalid argument is supplied

`getFromDatabaseById`:

- Takes the model name argument and a second string argument representing the unique ID of the element. Returns the instance with valid inputs and `-1` with an invalid id.

`addToDatabase`:

- Takes the model name argument and a second argument which is an object with the key-value pairs of the new instance. `addToDatabase` handles assigning `.id` properties to the instances. It does not check to make sure that valid inputs are supplied, so you will have to add those checks to your routes if necessary. `addToDatabase` will return the newly-created instance from the database. This function will validate the schema of the instance to create and throw an error if it is invalid.

`updateInstanceInDatabase`:

- Takes the model name argument and a second argument which is an object representing an updated instance. The instance provided must have a valid `.id` property which will be used to match. `updateInstanceInDatabase` will return the updated instance in the database or `null` with invalid inputs. This function will validate the schema of the updated instance and throw an error if it is invalid.

`deleteFromDatabasebyId`:

- Takes the model name argument and a second string argument representing the unique ID of the element to delete. Returns `true` if the delete occurs properly and `false` if the element is not found.

`deleteAllFromDatabase`:

- Takes only the single argument for model name. Deletes all elements from the proper model and returns a new, empty array. You will only need to use this function for a /api/meetings route.

#### Schemas

- Minion:
  - id: string
  - name: string
  - title: string
  - salary: number
- Idea
  - id: string
  - name: string
  - description: string
  - numWeeks: number
  - weeklyRevenue: number
- Meeting
  - time: string
  - date: JS `Date` object
  - day: string
  - note: string


### Custom Middleware

- I have created a custom middleware function `checkMillionDollarIdea` which checks any new or updated ideas are still worth at least one million dollars! This function is stored in the **server/checkMillionDollarIdea.js** file.
