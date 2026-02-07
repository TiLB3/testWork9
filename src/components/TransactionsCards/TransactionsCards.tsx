import {useAppDispatch, useAppSelector} from "../../app/store/hooks.ts";
import {useEffect} from "react";
import Spinner from "../UI/Spinner/Spinner.tsx";
import {Grid} from "@mui/material";
import {
  fetchAllTransactions,
  getLoadingAllTransactions,
  getTransactions
} from "../../app/Features/transactionSlice.ts";
import TransactionCard from "./TransactionCard/TransactionCard.tsx";

const TransactionsCards = () => {
  const transactions = useAppSelector(getTransactions);
  const dispatch = useAppDispatch();
  const loadingAllTransactions = useAppSelector(getLoadingAllTransactions);


  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch])

  return (
    <>
      {loadingAllTransactions
        ?
        <Spinner isLoading={loadingAllTransactions} />
        :
        transactions.length === 0
          ?
          <h2>No transactions</h2>
          :
          <>
            <Grid
              container
              spacing={2}
              sx={{flexDirection: 'column', mt: 4, gap: 4, mb: 4}}
            >
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.category}
                  category={transaction.category}
                  amount={transaction.amount}
                  createdAt={transaction.createdAt}
                  id={transaction.id}
                />
              ))}
            </Grid>
          </>
      }
    </>
  );
};

export default TransactionsCards;