import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const StockSearch = ({
  stockToSearch,
  handleInputChange,
  handleStockSearch,
  stockToSend
}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-12">
        {/* <Grid container justify="center"> */}
        <Card className="stockSearch mb-3">
          <CardContent>
            <h2 className="text-center mb-2">Stock Search</h2>
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
            {stockToSend === "" ? (
              <Button
                variant="contained"
                color="secondary"
                className="btn text-center btn-outline-primary my-2"
                onClick={handleStockSearch}
              >
                Search
              </Button>
            ) : stockToSearch.length === 0 ? (
              <Button
                variant="contained"
                color="secondary"
                className="btn text-center btn-outline-primary my-2"
                onClick={handleStockSearch}
              >
                CLEAR
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                className="btn text-center btn-outline-primary my-2"
                onClick={handleStockSearch}
              >
                Search
              </Button>
            )}
          </CardContent>
        </Card>
        {/* </Grid> */}
      </div>
      <div className="col-md-8 col-12">
        {stockToSend !== "" && (
          <Card className="mb-2">
            <CardContent className="test">
              <TradingViewWidget
                symbol={stockToSend}
                theme={Themes.DARK}
                locale="en"
                autosize
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StockSearch;
