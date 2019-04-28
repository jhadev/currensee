const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// Matches with "/api/external/

let searchTerm;
let wegmansProductData = [];

router
  .route("/walmart")
  .post((req, res) => {
    searchTerm = JSON.stringify(req.body);
    console.log(req.body);
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
        console.log(response.data.items);
        res.json(response.data.items);
      })
      .catch(error => console.log(error));
  });

router
  .route("/wegmans")
  .post((req, res) => {
    searchTerm = JSON.stringify(req.body);
    console.log(req.body);
    res.json(req.body);
  })
  .get((req, res) => {
    //testing api call
    axios
      .get(
        `https://api.wegmans.io/products/search?query=apples&api-version=2018-10-18&results=10&subscription-key=${
          process.env.WEG_API_KEY
        }`
      )
      .then(response => {
        //THIS NEEDS WORK
        //ABSOLUTE MESS
        console.log(response.data);
        let data = response.data.results;

        const getData = async arr => {
          return await Promise.all(
            arr.map((item, index) => {
              let route = JSON.stringify(item._links[0].href).slice(1, -1);

              axios
                .get(
                  `https://api.wegmans.io${route}&subscription-key=${
                    process.env.WEG_API_KEY
                  }`
                )
                .then(response => {
                  console.log(response.data);
                  wegmansProductData.push(response.data);
                  console.log(wegmansProductData);
                  return wegmansProductData;
                })
                .catch(error => console.log(error));
            })
          );
        };

        getData(data);
      })
      .catch(error => console.log(error));

    if (wegmansProductData.length === 10) {
      res.json(wegmansProductData);
    }
  });

module.exports = router;
