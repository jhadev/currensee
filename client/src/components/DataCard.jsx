import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const DataCard = ({ budgetTotal }) => {
  return (
    <div className="row">
      <div className="col">
        <Grid container justify="center">
          <Card className="total-sum">
            <CardContent style={{ marginBottom: -10 }}>
              {budgetTotal <= 0 ? (
                <h3>BUDGET TOTAL: ${budgetTotal.toFixed(2)}</h3>
              ) : (
                <h3>DISPOSABLE INCOME: ${budgetTotal.toFixed(2)}</h3>
              )}
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default DataCard;
