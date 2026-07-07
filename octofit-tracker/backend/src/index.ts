import app from './server.js';

const port = Number(process.env.PORT) || 8000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
});
