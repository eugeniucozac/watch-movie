import express from 'express';
import cors from 'cors';
import cron  from 'node-cron';
import fs from 'fs';
import axios from 'axios';
import * as bodyParser from 'body-parser';

const app = express();
const API_URL = 'https://officiallondontheatre.com/wp-json/shows/all-open';

const theatreShowsRawData = fs.readFileSync('theatre_shows.json');
const theatreShowsData = JSON.parse(theatreShowsRawData.toString());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/shows/all-shows', (req: express.Request, res: express.Response) => {
  res.json(theatreShowsData);
});

const fetchData = async () => {
  try {
      const response = await axios.get(API_URL);
      return response.data;
  } catch (err) {
      console.error('Error fetching data:', err);
      return null;
  }
}

const saveDataToFile = (data) => {
  const fileName = `theatre_shows.json`;
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err) {
          console.error('Error saving data to file:', err);
      } else {
          console.log(`Data saved to ${fileName}`);
      }
  });
}

cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled task...');
  const data = await fetchData();
  if (data) {
      saveDataToFile(data);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
