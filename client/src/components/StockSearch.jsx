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
        <Card className="stockSearch mb-3">
          <CardContent>
            <div className="text-center">
              <img
                src="https://user-images.githubusercontent.com/42519030/56464903-1691c280-63c1-11e9-8c35-f067abeda506.png"
                alt="tradingview"
                className="img-fluid walmartLogo text-center my-4"
              />
            </div>
            <input
              className="form-control"
              value={stockToSearch}
              onChange={handleInputChange}
              name="stockToSearch"
              placeholder="Enter a symbol, ex: AAPL, BTC"
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
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className="text-center my-2"
                  onClick={handleStockSearch}
                >
                  Clear Chart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-center yahooLink m-2"
                  target="_blank"
                  href={`https://finance.yahoo.com/quote/${stockToSend.toUpperCase()}?p=${stockToSend.toUpperCase()}&.tsrc=fin-srch`}
                  rel="noopener noreferrer"
                >
                  View on Yahoo! Finance
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                className="text-center my-2"
                onClick={handleStockSearch}
              >
                Search Again
              </Button>
            )}
          </CardContent>
        </Card>
        {/* </Grid> */}
      </div>
      <div className="col-md-8 col-12">
        {stockToSend !== "" && (
          <Card className="widgetCard">
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
