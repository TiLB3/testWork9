import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const ToolBar = () => {

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
              >
                Add</Typography>
            </Box>


          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;