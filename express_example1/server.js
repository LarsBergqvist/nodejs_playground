'use strict'
const express = require('express'),
      app = express();

app.use(express.static('public'));

//app.get('/', (req,res) => res.send('Hello from Express!'));
app.listen(4000);
