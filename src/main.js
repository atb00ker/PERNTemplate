
let express = require('express'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  cors = require('cors'),
  models = require('./models'),
  router = require('./routes/router'),
  app = express();
require('dotenv').config();
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options(process.env.NODE_CORS, cors());
app.use(cookieParser());
app.use('/', router);

models.sequelize.sync().then(_ => {
  app.listen(port);
  console.log(`API Server Running @ http://127.0.0.1:${port}`);
}).catch(_ => {
  console.log("SQL connection failed, couldn't connect to database.");
});

