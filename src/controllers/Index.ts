// Just returns the index.html file to get the ball
// rolling. It wouldn't be required in an actual
// application because nginx can take care of this.

export const html_page = (_: any, res: any, __: any) => {
  res.render('../../dist/index.html');
}
