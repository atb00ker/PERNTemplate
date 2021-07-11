import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import db from "./models";
import http from "http";
import router from "./routes/Router";
import * as WebSocketServer from 'ws';
import * as dotenv from "dotenv";

dotenv.config();
const app = express(),
  server = http.createServer(app),
  websocket = new WebSocketServer.Server({ server });

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/ws', (req: any, _, next) => { req.ws = websocket; next(); });
app.use('/', router);

db.sequelize.sync().then((_: any) => {
  const port_number: number = parseInt(process.env.APP_PORT || '0');
  server.listen(port_number, "0.0.0.0");
  console.log(`API Server Running @ http://0.0.0.0:${port_number}`);
}).catch((_: any) => {
  console.log("SQL connection failed, couldn't connect to database.");
});
