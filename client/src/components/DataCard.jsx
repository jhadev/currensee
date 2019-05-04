import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

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
                <h3>BUDGET TOTAL: ${budgetTotal.toFixed(2)}</h3>
              ) : (
                <h3>DISPOSABLE INCOME: ${budgetTotal.toFixed(2)}</h3>
              )}
              <div>{children[1]}</div>
              <hr />
              <h3>
                {total > 0 ? "SURPLUS" : "DEFICIT"} FOR {formattedDate} $
                {totalForThisMonth().toFixed(2)}
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
