import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Wrapper from "./common/Wrapper";

const WalmartSearch = ({ itemToSearch, handleInputChange, handleSearch }) => {
  return (
    <Wrapper>
      <Card className="total-sum">
        <CardContent>
          <div className="text-center text-primary">
            <img
              src="https://user-images.githubusercontent.com/42519030/56179504-f5e9f700-5fd3-11e9-9d89-ad7ee7800272.png"
              alt="walmart"
              className="img-fluid walmartLogo mb-2"
            />
          </div>
          <input
            className="form-control"
            value={itemToSearch}
            onChange={handleInputChange}
            name="itemToSearch"
            placeholder="Search for a product"
            type="text"
            list="item-list"
          />
          <Button
            variant="contained"
            color="secondary"
            className="btn text-center btn-outline-primary my-2"
            onClick={handleSearch}
          >
            Search
          </Button>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default WalmartSearch;
