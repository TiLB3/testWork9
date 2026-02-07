import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks.ts";
import {
  deleteCategoryById,
  fetchAllCategories,
  getLoadingDelete
} from "../../../app/Features/categorySlice.ts";
import {useState} from "react";
import CustomModal from "../../UI/CustomModal/CustomModal.tsx";
import FormCategories from "../../FormCategories/FormCategories.tsx";

interface Props {
  type: string;
  name: string;
  id: string;
}

const CategoryCard: React.FC<Props> = ({type, name, id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteLoading = useAppSelector(getLoadingDelete);
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid size={12}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                ml: "auto",
                color: type === "expense" ? "#ff1744" : "#00e676"
            }}
            >
              {type}
            </Typography>

          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 2
            }}
          >
            <Button
              variant="outlined"
              color="error"
              loading={deleteLoading}
              loadingPosition="end"
              onClick={async (e) => {
                e.stopPropagation()
                await dispatch(deleteCategoryById(id));
                await dispatch(fetchAllCategories());
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={async () => {
                setIsOpen(prevState => !prevState);
              }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <CustomModal
        toggleModal={() => setIsOpen(prevState => !prevState)}
        isOpen={isOpen}
      >
        <Typography
          sx={{
            mb: 3,
          }}
          variant="h4"
          component="div"
        >Edit category:</Typography>
        <Box>
          <FormCategories
            isEdit={true}
            defaultValues={{type, name}}
            id={id}
            closeModal={() => setIsOpen(prevState => !prevState)}
          />
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
    </>
  );
};

export default CategoryCard;