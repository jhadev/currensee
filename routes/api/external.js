const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// Matches with "/api/external/

let searchTerm;

router
  .route("/walmart")
  .post((req, res) => {
    searchTerm = JSON.stringify(req.body);
    res.json(req.body);
  })
  .get((req, res) => {
    //testing api call
    axios
      .get(
        `https://api.walmartlabs.com/v1/search?apiKey=${
          process.env.API_KEY
        }&query=${searchTerm}`
      )
      .then(response => {
        res.json(response.data.items);
      })
      .catch(error => console.log(error));
  });

module.exports = router;
