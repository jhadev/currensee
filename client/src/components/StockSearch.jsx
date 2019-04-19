import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";

const StockSearch = ({
  stockToSearch,
  handleInputChange,
  handleStockSearch,
  stockSearchResult
}) => {
  //
  // if (stockSearchResult !== {}) {
  // let dateTime = stockSearchResult.lastRefreshed.split(" ")
  let { symbol, lastRefreshed, lastTradePriceOnly } = stockSearchResult;

  // if (lastRefreshed !== "") {
  //   dateTime = lastRefreshed.split(" ");
  //   console.log(dateTime);
  // }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-12">
        {/* <Grid container justify="center"> */}
        <Card className="stockSearch">
          <CardContent>
            <div>
              <h2>{symbol !== "" ? symbol.toUpperCase() : symbol}</h2>
              <h2>{lastRefreshed}</h2>
              <h2>{lastTradePriceOnly}</h2>
              <h2>{moment().format("LLLL")}</h2>
            </div>
            <div className="text-center text-primary" />
            <input
              className="form-control"
              value={stockToSearch}
              onChange={handleInputChange}
              name="stockToSearch"
              placeholder="Search for a stock symbol"
              type="text"
              list="item-list"
            />
            <Button
              variant="contained"
              color="secondary"
              className="btn text-center btn-outline-primary my-2"
              onClick={handleStockSearch}
            >
              Search
            </Button>
          </CardContent>
        </Card>
        {/* </Grid> */}
      </div>
    </div>
  );
};

export default StockSearch;
