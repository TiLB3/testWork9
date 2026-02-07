import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks.ts";
import {
  fetchAllCategories,
  getCategories
} from "../../../app/Features/categorySlice.ts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import CustomModal from "../../UI/CustomModal/CustomModal.tsx";
import {
  deleteTransactionById,
  fetchAllTransactions,
  getLoadingDeleteTransactios
} from "../../../app/Features/transactionSlice.ts";
import dayjs from "dayjs";
import FormTransaction from "../../FormTransaction/FormTransaction.tsx";

interface Props {
  category: string;
  amount: number;
  createdAt: string;
  id: string;
}

const TransactionCard: React.FC<Props> = ({
                                            category,
                                            amount,
                                            createdAt,
                                            id
                                          }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteLoading = useAppSelector(getLoadingDeleteTransactios);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const findCategory = categories.find((categoryItem) => categoryItem.id === category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

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
              pt: 3
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {dayjs(createdAt).format('DD-MM-YYYY HH:mm')}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ml: "auto"}}
              >
                {findCategory?.name}
              </Typography>
            </Box>
            {findCategory &&
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  ml: "auto",
                  color: findCategory.type === "expense" ? "#ff1744" : "#00e676"
                }}
              >
                {findCategory?.type === "expense" ? "-" : "+"} {amount} KGS
              </Typography>
            }
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
                if (confirm("Are you sure you want to delete this transaction?")) {
                  await dispatch(deleteTransactionById(id));
                  await dispatch(fetchAllTransactions());
                }
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
        >Edit transaction:</Typography>
        <Box>
          {findCategory &&
            <FormTransaction
              isEdit={true}
              defaultValues={{
                type: findCategory.type,
                category: category,
                amount
              }}
              id={id}
              createdAt={createdAt}
              closeModal={() => setIsOpen(prevState => !prevState)}
            />
          }
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

export default TransactionCard;