require('dotenv').config();
let express = require('express'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  cors = require('cors'),
  models = require('./models'),
  router = require('./routes/Router'),
  app = express(),
  WebSocketServer = require("ws").Server,
  http = require("http"),
  server = http.createServer(app),
  websocket = new WebSocketServer({ server });

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
  server.listen(process.env.HTTP_PORT);
  console.log(`API Server Running @ http://127.0.0.1:${process.env.HTTP_PORT}`);
}).catch(_ => {
  console.log("SQL connection failed, couldn't connect to database.");
});
