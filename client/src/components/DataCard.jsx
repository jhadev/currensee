import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "./DataCard.css";

const DataCard = ({ budgetTotal, dataForThisMonth, breakdown }) => {
  const totalForThisMonth = () => {
    const total = dataForThisMonth("true") - dataForThisMonth("false");
    return total;
  };

  const total = totalForThisMonth();
  const { children } = breakdown.props;
  const formattedDate = moment()
    .format("MMMM, YYYY")
    .toUpperCase();

  return (
    <div className="row">
      <div className="col">
        <Grid container justify="center">
          <Card className="total-sum">
            <CardContent className="text-center" style={{ marginBottom: -10 }}>
              {budgetTotal <= 0 ? (
                <h3>
                  BUDGET TOTAL:{" "}
                  <span className="deficit">${budgetTotal.toFixed(2)}</span>
                </h3>
              ) : (
                <h3>
                  DISPOSABLE INCOME:{" "}
                  <span className="surplus">${budgetTotal.toFixed(2)}</span>
                </h3>
              )}
              <div>{children[1]}</div>
              <hr />
              <h3>
                {total > 0 ? (
                  <React.Fragment>
                    <span className="surplus">SURPLUS</span>{" "}
                    <span>FOR {formattedDate}</span>
                    <span className="surplus">
                      {" "}
                      ${totalForThisMonth().toFixed(2)}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="deficit">DEFICIT</span>{" "}
                    <span>FOR {formattedDate}</span>
                    <span className="deficit">
                      {" "}
                      ${totalForThisMonth().toFixed(2)}
                    </span>
                  </React.Fragment>
                )}
              </h3>
              <div>{children[0]}</div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default DataCard;
