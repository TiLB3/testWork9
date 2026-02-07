import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import CustomModal from "../CustomModal/CustomModal.tsx";
import FormTransaction from "../../FormTransaction/FormTransaction.tsx";

const ToolBar = () => {
  const [isOpem, setIsOpen] = useState(false);

  return (
    <Box sx={{flexGrow: 1, marginBottom: 3}}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  sm: 'block',
                  textDecoration: 'none',
                  color: 'white',
                }
              }}
              component={NavLink}
              to="/"
            >
              Finance Tracker
            </Typography>

            <Box sx={{marginLeft: 'auto', display: "flex"}}>
              <Typography
                variant="h6"
                component={NavLink}
                to="/categories"
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                  padding: '0 10px',
                  '&.active': {color: '#afafaf'},
                  '&:hover': {color: '#afafaf'}

                }}
              >
                Categories</Typography>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                  padding: '0 10px',
                  '&.active': {color: '#afafaf'},
                  '&:hover': {color: '#afafaf'}

                }}
                onClick={() => setIsOpen(prevState => !prevState)}
              >
                Add</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


      <CustomModal toggleModal={() => setIsOpen(prevState => !prevState)} isOpen={isOpem}>
        <Typography
          sx={{
            mb: 3,
          }}
          variant="h4"
          component="div"
        >Add category:</Typography>
        <FormTransaction closeModal={() => setIsOpen(prevState => !prevState)} />
        <Box
          sx={{
            mt: 5,
            alignItems: "center",
            gap: "15px"
          }}
        >
          <Button
            variant="contained"
            onClick={() => setIsOpen(prevState => !prevState)}
          >Cancel</Button>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default ToolBar;