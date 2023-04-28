const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/price', async (req, res) => {
  try {
    const response = await axios.get('https://www.metal.com/Lithium-ion-Battery/202303240001');
    const $ = cheerio.load(response.data);
    const price = $('span:contains("Price")').next().text().trim();
    res.json({ price });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
