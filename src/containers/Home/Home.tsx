import {Box, Container, Typography} from "@mui/material";
import TransactionsCards
  from "../../components/TransactionsCards/TransactionsCards.tsx";

const Home = () => {

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
        >
          Total
        </Typography>
      </Box>

      <TransactionsCards />
    </Container>
  );
};

export default Home;