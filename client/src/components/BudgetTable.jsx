import React from 'react';
import DataCard from './DataCard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import './BudgetTable.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';

const BudgetTable = ({
  arrayForBudgetTable,
  selectedBudgetItem,
  tableSelectedChange,
  handleItemDelete,
  exportBudget,
  launchDeleteAlert,
  createRef,
  income,
  expenses,
  budgetTotal,
  deleteItem,
  categoryPick,
  onPickedCategoryChange,
  globalFilter,
  globalFilterChange
}) => {
  let categories = [
    { label: 'All Categories', value: null },
    { label: 'Health', value: 'Health' },
    { label: 'Home', value: 'Home' },
    { label: 'Income', value: 'Income' },
    { label: 'Other', value: 'Other' },
    { label: 'Savings', value: 'Savings' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Utilities', value: 'Utilities' }
  ];

  let header = (
    <div style={{ textAlign: 'left' }}>
      <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }} />
      <InputText
        type="search"
        onInput={globalFilterChange}
        placeholder="Global Search"
        size="50"
      />
    </div>
  );

  let categoryFilter = (
    <Dropdown
      style={{ width: '100%' }}
      value={categoryPick}
      options={categories}
      onChange={onPickedCategoryChange}
    />
  );

  const thisMonth = moment().format('MM');
  const thisYear = moment().format('YYYY');

  const dataForThisMonth = str => {
    let dataForCurrentMonth = arrayForBudgetTable
      .filter(
        income =>
          income.income === str &&
          income.month === thisMonth &&
          income.year === thisYear
      )
      .map(income => income.amount)
      .reduce((a, b) => a + b, 0);
    return dataForCurrentMonth;
  };

  const totals = (
    <div className="mt-2 text-center">
      <div className="row justify-content-center my-1">
        <div className="col-12">
          <span className="income m-1">
            Income for {moment().format('MMMM, YYYY')}: {/* COLOR HERE */}
            <strong className="surplus1">
              ${dataForThisMonth('true').toFixed(2)}
            </strong>
          </span>
          <span className="expenses m-1">
            Expenses for {moment().format('MMMM, YYYY')}: {/* COLOR HERE */}
            <strong className="deficit1">
              ${dataForThisMonth('false').toFixed(2)}
            </strong>
          </span>
        </div>
      </div>
      <div className="row justify-content-center mt-1">
        <div className="col-12">
          <span className="income m-1">
            Total Income: <strong>${income.toFixed(2)}</strong>
          </span>
          <span className="expenses m-1">
            Total Expenses: <strong>${expenses.toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
  );

  const actionTemplate = (rowData, column) => {
    return (
      <div className="wrap">
        <button
          className="btn deleteBtn"
          value={rowData._id}
          // value={selectedBudgetItem._id}
          onClick={deleteItem}
        >
          X
        </button>
      </div>
    );
  };

  const rowClassName = rowData => {
    const { income } = rowData;
    return { highlightRed: income === 'false' };
  };

  const amountTemplate = (rowData, column) => {
    const { amount, income } = rowData;
    const color = income === 'false' ? 'red' : null;
    const fontWeight = amount >= 500 ? 'bold' : 'normal';

    return (
      <span style={{ fontWeight: fontWeight, color: color }}>
        {!Number.isInteger(amount) ? amount.toFixed(2) : amount}
      </span>
    );
  };

  const dateTemplate = rowData => {
    const { date } = rowData;
    const thisMonth = moment().format('MM');
    const tableDate = date.substring(0, 2);
    const fontWeight = tableDate === thisMonth ? 'bold' : 'normal';
    return <span style={{ fontWeight: fontWeight }}>{date}</span>;
  };

  return (
    <div>
      <DataCard
        dataForThisMonth={dataForThisMonth}
        budgetTotal={budgetTotal}
        breakdown={totals}
      />
      <Card style={{ marginBottom: 20 }} className="tableCard">
        <CardContent>
          <div className="d-flex">
            <div className="tableHeader">
              <Typography
                className="dashtext"
                variant="h4"
                color="textPrimary"
                gutterBottom
              >
                Budget Table
              </Typography>
            </div>
            <div className="buttonContainer ml-auto">
              <Button
                variant="contained"
                className="button csvButton"
                color="primary"
                onClick={exportBudget}
              >
                EXPORT CSV
              </Button>
              <Button
                variant="contained"
                className="button delButton mx-2"
                color="secondary"
                onClick={launchDeleteAlert}
              >
                DELETE ALL RECORDS
              </Button>
            </div>
          </div>
          <Typography
            className="tableHeader"
            color="textSecondary"
            gutterBottom
          >
            Click on headers to sort
          </Typography>
          <Typography
            className="tableHeader"
            color="textSecondary"
            gutterBottom
          >
            Double click on corresponding table row to delete a budget item
          </Typography>
          <DataTable
            header={header}
            globalFilter={globalFilter}
            ref={createRef}
            responsive={true}
            className="budget-table"
            paginator={true}
            rows={10}
            tableStyle={{ width: '100%' }}
            value={arrayForBudgetTable}
            rowClassName={rowClassName}
            selectionMode="single"
            selection={selectedBudgetItem}
            onSelectionChange={tableSelectedChange}
            onRowDoubleClick={handleItemDelete}
            footer={totals}
            sortMode="multiple"
            reorderableColumns={true}
          >
            <Column
              className="table-data"
              field="date"
              sortable="true"
              header="Date"
              body={dateTemplate}
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
              body={amountTemplate}
            />
            <Column
              className="table-data"
              field="category"
              header="Category"
              sortable="true"
              filter={true}
              filterElement={categoryFilter}
            />
            <Column
              className="income-expense"
              field="income"
              header="Income"
              sortable="true"
            />
            <Column
              className="delete"
              field="_id"
              header="Delete"
              body={actionTemplate}
            />
          </DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTable;
