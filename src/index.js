import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import authenticate from './routes/authenticate';

const app = express();
const port = process.env.PORT || 5000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', authenticate);

app.listen(port, function() {
    console.log(`Application is running on http://localhost:${port}`);
});
