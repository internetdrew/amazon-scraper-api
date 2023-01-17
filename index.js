import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import request from 'request-promise';

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.SCRAPERAPI_API_KEY;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
