
let express = require('express');
let path = require('path');
let router = require('./router');
let app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'src/views'));
app.use('/', router);
app.listen(port);
console.log(`Server Running @ http://127.0.0.1:${port}`);
