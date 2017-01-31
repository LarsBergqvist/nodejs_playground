// use with babel-node server.js

from express import 'express';

let app = express();

app.get('/', (req,res) => res.send('Hello from Express!'));
app.listen(4000);
