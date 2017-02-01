// use with babel-node "server.js" or "npm start"

import express from 'express';

let app = express();

app.use(express.static('public'));

//app.get('/', (req,res) => res.send('Hello from Express!'));
app.listen(4000);
