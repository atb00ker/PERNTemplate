
let express = require('express'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  models = require('./models'),
  router = require('./routes/router'),
  app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

models.sequelize.sync().then(_ => {
  app.listen(port);
  console.log(`API Server Running @ http://127.0.0.1:${port}`);
})

