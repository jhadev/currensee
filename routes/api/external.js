const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// Matches with "/api/external/

let searchTerm;
let wegmansProductLinks = [];
let wegmansPriceLinks = [];

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
              let link = `https://api.wegmans.io${JSON.stringify(
                item._links[0].href
              ).slice(1, -1)}&subscription-key=${process.env.WEG_API_KEY}`;
              wegmansProductLinks.push(link);
            })
          );
        };
        //eek gotta be an easier way
        getData(data).then(response => {
          axios
            .all([
              axios.get(wegmansProductLinks[0]),
              axios.get(wegmansProductLinks[1]),
              axios.get(wegmansProductLinks[2]),
              axios.get(wegmansProductLinks[3]),
              axios.get(wegmansProductLinks[4])
            ])
            .then(
              axios.spread((first, second, third, fourth, fifth) => {
                let productData = [
                  first.data,
                  second.data,
                  third.data,
                  fourth.data,
                  fifth.data
                ];

                const getPriceData = async arr => {
                  return await Promise.all(
                    arr.map((item, index) => {
                      let link = `https://api.wegmans.io${JSON.stringify(
                        item._links[2].href
                      ).slice(1, -1)}&subscription-key=${
                        process.env.WEG_API_KEY
                      }`;
                      wegmansPriceLinks.push(link);
                      console.log(wegmansPriceLinks);
                    })
                  );
                };

                getPriceData(productData)
                  .then(response => {
                    res.json(wegmansPriceLinks);
                    axios.all([
                      axios.get(wegmansPriceLinks[0]),
                      axios.get(wegmansPriceLinks[1]),
                      axios.get(wegmansPriceLinks[2]),
                      axios.get(wegmansPriceLinks[3]),
                      axios.get(wegmansPriceLinks[4])
                    ]);
                  })
                  .then(
                    axios.spread(
                      (
                        productOne,
                        productTwo,
                        productThree,
                        productFour,
                        productFive
                      ) => {
                        console.log(
                          productOne,
                          productTwo,
                          productThree,
                          productFour,
                          productFive
                        );
                        wegmansPriceLinks = [];
                        wegmansProductLinks = [];
                        // res.json([
                        //   first.data,
                        //   second.data,
                        //   third.data,
                        //   fourth.data,
                        //   fifth.data
                        // ]);
                      }
                    )
                  );
              })
            );
        });
      });
  });

module.exports = router;
