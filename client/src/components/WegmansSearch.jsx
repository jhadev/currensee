import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const WegmansSearch = ({ itemToSearch, handleInputChange, handleSearch }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-12">
        {/* <Grid container justify="center"> */}
        <Card className="total-sum">
          <CardContent>
            <div className="text-center text-primary">
              {/* <img
                src="https://user-images.githubusercontent.com/42519030/56179504-f5e9f700-5fd3-11e9-9d89-ad7ee7800272.png"
                alt="wegmans"
                className="img-fluid wegmansLogo mb-2"
              /> */}
              <h2>Wegmans</h2>
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
        {/* </Grid> */}
      </div>
    </div>
  );
};

export default WegmansSearch;
