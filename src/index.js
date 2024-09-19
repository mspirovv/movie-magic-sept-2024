import express from 'express';
import handlebars from 'express-handlebars';

import routes from './routes.js'

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));

app.use(routes);

app.listen(5000, () => console.log("Server is running on localhost:5000"))