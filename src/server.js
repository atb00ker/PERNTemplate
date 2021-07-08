require('dotenv').config();
let express = require('express'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  cors = require('cors'),
  models = require('./models'),
  router = require('./routes/Router'),
  app = express(),
  WebSocket = require('ws'),
  websocket = new WebSocket.Server({ host: process.env.WS_HOST, port: process.env.WS_PORT });

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options(process.env.NODE_CORS, cors());
app.use(cookieParser());
app.use('/ws', (req, res, next) => { req.ws = websocket; next(); });
app.use('/', router);

models.sequelize.sync().then(_ => {
  app.listen(process.env.HTTP_PORT);
  console.log(`API Server Running @ http://127.0.0.1:${process.env.HTTP_PORT}`);
}).catch(_ => {
  console.log("SQL connection failed, couldn't connect to database.");
});
