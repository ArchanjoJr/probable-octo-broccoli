const { printRoutes } = require('./util')

const {app, routes} = require('./app');
const {PORT} = require('./config');

app.listen(PORT, () => {
  printRoutes(`LOCALHOST:${PORT}`, routes);
});

module.exports = app;