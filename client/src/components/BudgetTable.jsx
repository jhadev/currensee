import React from "react";
import { DataTable, Column } from "primereact/datatable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const BudgetTable = props => {
  return (
    <Card style={{ marginBottom: 20 }} className={classes.card}>
      <CardContent>
        <Typography
          className="dashtext"
          variant="p"
          color="textPrimary"
          gutterBottom
        >
          Budget Table
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Click on headers to sort
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Double click on corresponding table row to delete a budget item
        </Typography>
        <DataTable
          className="budget-table"
          paginator={true}
          rows={10}
          tableStyle={{ width: "100%" }}
          value={this.state.arrayForBudgetTable}
          rowClassName={this.rowClassName}
          selectionMode="single"
          selection={this.state.selectedBudgetItem}
          onSelectionChange={e =>
            this.setState({ selectedBudgetItem: e.value })
          }
          onRowDoubleClick={this.handleItemDelete}
        >
          <Column
            className="table-data"
            field="date"
            sortable="true"
            header="Date"
          />
          <Column
            className="table-data"
            field="description"
            header="Description"
            sortable="true"
          />
          <Column
            className="table-data"
            field="amount"
            sortable="true"
            header="Amount"
            body={this.amountTemplate}
          />
          <Column
            className="table-data"
            field="category"
            header="Category"
            sortable="true"
          />
          <Column
            className="table-data"
            field="income"
            header="Income"
            sortable="true"
          />
        </DataTable>
      </CardContent>
    </Card>
  );
};

export default BudgetTable;
