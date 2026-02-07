import {Box, Button, Container, Typography} from "@mui/material";
import CategoriesCards
  from "../../components/CategoriesCards/CategoriesCards.tsx";
import {useState} from "react";
import CustomModal from "../../components/UI/CustomModal/CustomModal.tsx";
import FormCategories from "../../components/FormCategories/FormCategories.tsx";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography component="div" variant="h4">
          Categories
        </Typography>
        <Button variant="contained" onClick={() => setIsOpen(prevState => !prevState)}>Add</Button>
      </Box>
      <CategoriesCards />
      <CustomModal toggleModal={() => setIsOpen(prevState => !prevState)} isOpen={isOpen}>
        <Typography
          sx={{
            mb: 3,
          }}
          variant="h4"
          component="div"
        >Add new category:</Typography>
        <Box>
          <FormCategories isEdit={false} closeModal={() => setIsOpen(prevState => !prevState)}/>
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
        </Box>
      </CustomModal>
    </Container>
  );
};

export default Categories;