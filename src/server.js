const app = require('./app');

const { PORT } = process.env || 3000;

app.use((req, res) => {
  res.status(404).send('Error - Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
