const express = require('express');
const apiRouter = express.Router();

const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db');

const checkMillionDollarIdea =require('./checkMillionDollarIdea');
// Get an array of all the minions
apiRouter.get('/minions',(req,res,next) => {
    res.send(getAllFromDatabase('minions'))
})

// Create a new minion and save it to db
apiRouter.post('/minions',(req,res,next) => {
    const newMinion = addToDatabase('minions',req.body);
    res.status(201).send(newMinion);
})

apiRouter.param('minionId',(req,res,next,id) =>{
    const minion = getFromDatabaseById('minions',req.params.minionId);
    if (minion){
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion does not exists!')
    }
})

// Get a single minion by id
apiRouter.get('/minions/:minionId',(req,res,next) => {
    res.send(req.minion);
})

// Update a single new minion by id
apiRouter.put('/minions/:minionId',(req,res,next) => {
    const minion = updateInstanceInDatabase('minions',req.body);
    res.send(minion);
})

// Delete a single minion by id
apiRouter.delete('/minions/:minionId',(req,res,next) => {
    const flag = deleteFromDatabasebyId('minions',req.minion.id);
    if(flag){
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

// Get an array of all the ideas
apiRouter.get('/ideas',(req,res,next) => {
    res.send(getAllFromDatabase('ideas'))
})

// Create a new idea and save it to db
apiRouter.post('/ideas',checkMillionDollarIdea,(req,res,next) => {
    const newIdea = addToDatabase('ideas',req.body);
    res.status(201).send(newIdea);
})

apiRouter.param('ideaId',(req,res,next,id) =>{
    const idea = getFromDatabaseById('ideas',req.params.ideaId);
    if (idea){
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea does not exists!')
    }
})

// Get a single idea by id
apiRouter.get('/ideas/:ideaId',(req,res,next) => {
    res.send(req.idea);
})

// Update a single new idea by id
apiRouter.put('/ideas/:ideaId',checkMillionDollarIdea,(req,res,next) => {
    const idea = updateInstanceInDatabase('ideas',req.body);
    res.send(idea);
})

// Delete a single idea by id
apiRouter.delete('/ideas/:ideaId',(req,res,next) => {
    const flag = deleteFromDatabasebyId('ideas',req.idea.id);
    if(flag){
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})
// Get an array of all the meetings
apiRouter.get('/meetings',(req,res,next)=>{
    res.send(getAllFromDatabase('meetings'))
});
// Add a new meeting to the database
apiRouter.post('/meetings',(req,res,next) => {
    const newMeeting = addToDatabase('meetings',createMeeting());
    res.status(201).send(newMeeting);
});

// Delete all the meetings from the database
apiRouter.delete('/meetings',(req,res,next) => {
    const flag = deleteAllFromDatabase('meetings');
    res.status(204).send(flag)
})

module.exports = apiRouter;
