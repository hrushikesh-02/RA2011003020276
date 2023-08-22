const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
const TIMEOUT = 500;

app.get("/fetchAndSort", async (req, res) => {
  const urls = req.query.urls;
  const responsePromises = [];

  urls.forEach((url) => {
    const responsePromise = axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => null);
    responsePromises.push(responsePromise);
  });

  try {
    const responses = await Promise.all(responsePromises);
    const allNumbers = responses;
    const arr = [];

    allNumbers.forEach((el) => {
      if (el && el.numbers) arr.push(...el.numbers);
    });

    const uniqueSortedNumbers = Array.from(new Set(arr)).sort((a, b) => a - b);
    res.json(uniqueSortedNumbers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the requests." });
  }
});

app.listen(PORT, () => {
  console.log(`Microservice is running on port ${PORT}`);
});
