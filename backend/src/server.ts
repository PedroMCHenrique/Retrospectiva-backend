import app from './app';
import 'dotenv/config';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
})