const app = require('./app');
const logger = require('./middlewares/logger');

const { PORT } = process.env || 3000;

app.use((req, res) => {
  res.status(404).send('Error - Page not found');
});

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
