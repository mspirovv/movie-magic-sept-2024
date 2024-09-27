import express from 'express';

import routes from './routes.js'
import handlebarsInit from './config/handlebarsInit.js';
import expressInit from './config/expressInit.js';
import mongooseInit from './config/mongooseInit.js';

const app = express();

mongooseInit();
handlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(5000, () => console.log("Server is running on localhost:5000"))