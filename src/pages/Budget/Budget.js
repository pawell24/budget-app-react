import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetedCategories,
} from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import { useMemo } from "react";
import { LoadingIndicator } from "components";
import BudgetCategoryList from "./components/BudgetCategoryList";
import BudgetTransactionList from "./components/BudgetTransactionList";

const Budget = ({
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
}) => {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);
  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      !!budgetState &&
      Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  return (
    <Grid>
      <section>
        {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
      </section>
      <section>
        {" "}
        {isLoaded ? <BudgetTransactionList /> : <LoadingIndicator />}
      </section>
    </Grid>
  );
};

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
  }
)(Budget);
