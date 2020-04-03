const { app } = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`API RUNNING AT PORT: ${PORT}, ON : ${new Date()}`);
});

module.exports = app;
