import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

// Add this line to handle JSON payloads
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
