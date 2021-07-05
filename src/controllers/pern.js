const models = require("../models"),
  WebSocket = require('ws'),
  wss = new WebSocket.Server({ host: 'localhost', port: 3001 });

exports.update_websocket = function (_, res, _) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(Date.now());
    }
  })
  return res.status(201).send();
}

exports.create_pern = function (req, res, _) {
  return models.Pern.create({ name: req.body.name }).then(row => {
    res.status(201).send({ id: row.get('id'), name: row.get('name') });
  });
}

exports.get_pern = function (_, res, _) {
  return models.Pern.findAll({ attributes: ['id', 'name'] }).then(result => {
    res.status(200).send(result.map(row => row.get()));
  })
}

exports.get_pern_details = function (req, res, _) {
  return models.Pern.findByPk(req.params.pern_id).then(result => {
    if (result)
      res.status(200).send(result.get());
    else
      res.status(200).send();
  });
}

exports.put_pern_details = function (req, res, _) {
  models.Pern.findByPk(req.params.pern_id).then(result => {
    if (result) {
      result.update({ name: req.body.name }).then(row => {
        return res.status(200).send(row.get());
      });
    } else {
      models.Pern.create({ id: req.params.pern_id, name: req.body.name }).then(row => {
        return res.status(201).send(row.get());
      });
    }
  });
}

exports.delete_pern_details = function (req, res, _) {
  return models.Pern.destroy({ where: { id: req.params.pern_id } }).then(deleted => {
    if (deleted)
      res.status(204).send();
    else
      res.status(404).send();
  });
}
