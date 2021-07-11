import db from "../models";
import { Request, Response } from 'express';
import * as WebSocket from 'ws';

export const update_websocket = (req: any, res: Response, __: any) => {
  req.ws.clients.forEach(function each(client: any) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(req.params.socket_info);
    }
  })
  return res.status(201).send();
}

export const create_pern = (req: Request, res: Response, __: any) => {
  return db.Pern.create({ name: req.body.name }).then((row: any) => {
    res.status(201).send({ id: row.get('id'), name: row.get('name') });
  });
}

export const get_pern = (_: Request, res: Response, __: any) => {
  return db.Pern.findAll({ attributes: ['id', 'name'] }).then((result: any) => {
    res.status(200).send(result.map((row: any) => row.get()));
  });
}

export const get_pern_details = (req: Request, res: Response, __: any) =>  {
  return db.Pern.findByPk(req.params.pern_id).then((result: any) => {
    if (result)
      res.status(200).send(result.get());
    else
      res.status(200).send();
  });
}

export const put_pern_details = (req: Request, res: Response, __: any)=> {
  db.Pern.findByPk(req.params.pern_id).then((result: any) => {
    if (result) {
      result.update({ name: req.body.name }).then((row: any) => {
        return res.status(200).send(row.get());
      });
    } else {
      db.Pern.create({ id: req.params.pern_id, name: req.body.name }).then((row: any) => {
        return res.status(201).send(row.get());
      });
    }
  });
}

export const delete_pern_details = (req: Request, res: Response, __: any) => {
  return db.Pern.destroy({ where: { id: req.params.pern_id } }).then((deleted: any) => {
    if (deleted)
      res.status(204).send();
    else
      res.status(404).send();
  });
}
