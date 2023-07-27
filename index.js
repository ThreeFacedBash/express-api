//Importing the back end web application framework for building RESTful APIs with Node.js

import express from 'express';

const app = express();

//Adding additional configuration to the Express Module using middleware command 'use'

app.use(express.json())

//Using middleware to link HTML and CSS files to a localhost page
app.use(express.static('public'));

//Setting up the API
/*
req - is used to send something in (input)
res - is used to send something out (output)
*/

app.get('/', function(req, res){
    res.send('Hello greeting from the API GET command!')
})

//Adding the root 

const greetings = {         //this variable is called a MAP and it is used to hold the language variable
    'english': 'hello',
}

app.get('/api/greet', function(req, res){
    console.log(req.query)
    const username = req.query.username;
    const language = req.query.language;

    if(!greetings[language]){
        return res.json({
            error: 'Invalid language provided'
        })
    }

    const greeting = greetings[language];

    res.json({
        message: `${greeting}, ${username}!`,
    })
});

//Using 'params' to add the root on the URL

app.get('/api/greet/:username', function(req, res){
  const username = req.params.username;
  res.json({
    message: `Hello, ${username}!`,
  })
});

//Adding a POST root to enable the greeting with multiple languages

app.post('/api/greet', function(req, res){
    
    //Add an entry to our greetings map
    const language = req.body.language;
    greetings[language] = req.body.greeting

    res.json({
        status: 'success',
        message: `Greeting for ${language} has been successfully added`
    });
});

//Definig the post which we will use to access the API

const PORT = process.env.PORT || 4009;

app.listen(PORT, function(){
    console.log(`We starting the app on this port => ${PORT}`)
});

