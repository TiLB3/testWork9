import {Box, Container, Typography} from "@mui/material";
import TransactionsCards
  from "../../components/TransactionsCards/TransactionsCards.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/hooks.ts";
import {getTransactions} from "../../app/Features/transactionSlice.ts";
import {
  fetchAllCategories,
  getCategories
} from "../../app/Features/categorySlice.ts";
import {useEffect} from "react";

const Home = () => {
  const transactions = useAppSelector(getTransactions);
  const categories = useAppSelector(getCategories);
  const dispatch = useAppDispatch();


  const getTotalNumber = () => {
    if (categories.length === 0) return 0;

    return transactions.reduce((acc, transaction) => {
      const findCategory = categories.find((cat) => cat.id === transaction.category);

      if (!findCategory) return acc;
      const amount = transaction.amount;
      return findCategory.type === "expense" ? acc - amount : acc + amount;
    }, 0);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5
        }}
      >
        <Typography
          component="div"
          variant="h4"
          sx={{
            color: getTotalNumber() < 0 ? "#ff1744" : "#00e676"
          }}
        >
          Total: {getTotalNumber()}
        </Typography>
      </Box>

      <TransactionsCards />
    </Container>
  );
};

export default Home;