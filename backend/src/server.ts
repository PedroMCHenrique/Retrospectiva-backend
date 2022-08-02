import 'dotenv/config';
import app from './app';

const { APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`app running on port ${APP_PORT}`);
})
