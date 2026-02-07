import {Grid} from "@mui/material";

const Transactions = () => {

  return (
    <>
      {transactions.length === 0
        ?
        <h2>No Items!</h2>
        :
        <Grid
          container
          spacing={2}
          sx={{flexDirection: 'column', mt: 4, gap: 4, mb: 4}}
        >
        </Grid>
      }
    </>
  );
};

export default Transactions;