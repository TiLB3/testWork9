import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/hooks";
import {
  addCategory,
  editCategory,
  fetchAllCategories,
  getCategory,
  getLoadingForm
} from "../../app/Features/categorySlice.ts";
import {toast} from "react-toastify";
import {Button, Grid, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';


interface Props {
  isEdit?: boolean;
  defaultValues?: ICategoryMutation;
  closeModal: () => void;
}

const FormCategories: React.FC<Props> = ({isEdit,
                                         defaultValues = {
                                           type: '',
                                           name: "",
                                         },closeModal}) => {

  const [form, setForm] = useState<ICategoryMutation>({...defaultValues});
  const loading = useAppSelector(getLoadingForm);
  const category = useAppSelector(getCategory);
  const dispatch = useAppDispatch();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.type.trim().length === 0 || form.name.trim().length === 0) {
      toast.error("The form is empty!!!");
      return;
    }

    if (isEdit) {
      if (category) await dispatch(editCategory({id: category.id, editedCategory: form}));
      //когда сделаешь транзакции
      // dispatch(updateCartDishes(dishes));
    } else {
      await dispatch(addCategory(form));
      // dispatch(updateCartDishes(dishes));
    }

    await dispatch(fetchAllCategories());
    setForm({type: '', name: ""});
    closeModal();
  }

  const onChangeField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        spacing={2}
        sx={{flexDirection: 'column', alignItems: 'center'}}
      >
        <Grid size={8}>
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
            >Select categories
            </option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </Grid>
        <Grid size={8}>
          <TextField
            fullWidth
            type="name"
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            name="name"
            value={form.name}
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={8}>
          <Button
            loading={loading}
            variant="outlined"
            loadingPosition="end"
            startIcon={<SaveIcon />}
            type="submit"
          >
            {isEdit ? 'Edit Categories' : 'Add Categories'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormCategories;