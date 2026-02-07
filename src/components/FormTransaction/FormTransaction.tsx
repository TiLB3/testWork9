import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/hooks";
import {toast} from "react-toastify";
import {Button, Grid, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import type {ITransactionMutation} from "../../types";
import {
  fetchAllCategories,
  getCategories
} from "../../app/Features/categorySlice.ts";
import {
  addTransaction,
  fetchAllTransactions,
  getLoadingFormTransaction
} from "../../app/Features/transactionSlice.ts";


interface Props {
  isEdit?: boolean;
  defaultValues?: ITransactionMutation;
  closeModal: () => void;
}

const FormTransaction: React.FC<Props> = ({
                                            isEdit,
                                            defaultValues = {
                                              type: "",
                                              category: '',
                                              amount: 0,
                                            }, closeModal
                                          }) => {

  const [form, setForm] = useState<ITransactionMutation>({...defaultValues});
  const loading = useAppSelector(getLoadingFormTransaction);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.category.trim().length === 0 || form.amount === 0) {
      toast.error("The form is empty!!!");
      return;
    }

    if (isEdit) {
      // if (category) await dispatch(editCategory({id: category.id, editedCategory: form}));
    } else {
      const {type, ...rest} = form;
      await dispatch(addTransaction({...rest, createdAt: new Date().toISOString(), amount: Number(form.amount)}));
    }
    await dispatch(fetchAllTransactions());
    setForm({category: '', amount: 0, type: ""});
    closeModal();
  }

  const onChangeField = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    if(name === "amount" && Number(value) < 0) return

    if(name === "type") {
      await dispatch(fetchAllCategories(value));
    }

    setForm({...form, [name]: value});
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        spacing={2}
        sx={{flexDirection: 'column', alignItems: 'center'}}
      >
        <Grid size={12}>
          <select
            name="type"
            value={form.type}
            onChange={onChangeField}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "4px",
              borderColor: "gray"
            }}
          >
            <option
              disabled
              value=""
            >Select Type
            </option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </Grid>
        <Grid size={12}>
          <select
            disabled={form.type.trim().length === 0 ? true : false}
            name="category"
            value={form.category}
            onChange={onChangeField}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "4px",
              borderColor: "gray"
            }}
          >
            <option
              disabled
              value=""
            >Select categories
            </option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            name="amount"
            value={form.amount}
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={12}>
          <Button
            loading={loading}
            variant="outlined"
            loadingPosition="end"
            startIcon={<SaveIcon />}
            type="submit"
          >
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormTransaction;