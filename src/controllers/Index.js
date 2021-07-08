// Just returns the index.html file to get the ball
// rolling. It wouldn't be required in an actual
// application because nginx can take care of this.

exports.htmlPage = function (_, res, __) {
  res.render('../../dist/index.html');
}
