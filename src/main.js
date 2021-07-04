
let express = require('express');
let cookieParser = require('cookie-parser');
let path = require('path');
let router = require('./routes/router');
let app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.listen(port);
console.log(`API Server Running @ http://127.0.0.1:${port}`);
