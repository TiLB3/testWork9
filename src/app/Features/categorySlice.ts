import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../../axiosApi.ts";

interface ICategorySlice {
  categories: ICategory[];
  category: ICategory | null;
  loading: {
    addCategoryLoading: boolean;
    deleteCategoryLoading: boolean;
    editCategoryLoading: boolean;
    fetchAllCategoryLoading: boolean;
  };
}

const initialState: ICategorySlice = {
  categories: [],
  category: null,
  loading: {
    addCategoryLoading: false,
    deleteCategoryLoading: false,
    editCategoryLoading: false,
    fetchAllCategoryLoading: false,
  }
}

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.category = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading.fetchAllCategoryLoading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state,{payload}) => {
      state.loading.fetchAllCategoryLoading = false;
      state.categories = payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.loading.fetchAllCategoryLoading = false;
    });


    builder.addCase(getCategoryById.pending, (state) => {
      state.loading.fetchAllCategoryLoading = true;
    });
    builder.addCase(getCategoryById.fulfilled, (state,{payload}) => {
      state.loading.fetchAllCategoryLoading = false;
      state.category = payload;
    });
    builder.addCase(getCategoryById.rejected, (state) => {
      state.loading.fetchAllCategoryLoading = false;
    });


    builder.addCase(addCategory.pending, (state) => {
      state.loading.addCategoryLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.loading.addCategoryLoading = false;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.loading.addCategoryLoading = false;
    });


    builder.addCase(deleteCategoryById.pending, (state) => {
      state.loading.deleteCategoryLoading = true;
    });
    builder.addCase(deleteCategoryById.fulfilled, (state) => {
      state.loading.deleteCategoryLoading = false;
    });
    builder.addCase(deleteCategoryById.rejected, (state) => {
      state.loading.deleteCategoryLoading = false;
    });


    builder.addCase(editCategory.pending, (state) => {
      state.loading.editCategoryLoading = true;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.loading.editCategoryLoading = false;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.loading.editCategoryLoading = false;
    });
  }
})


export const fetchAllCategories = createAsyncThunk<ICategory[]>(
  "categories/fetchAllCategories",
  async () => {
    const {data: response} = await axiosApi.get<ICategoryApi | null>("/categories.json");

    if (response) {
      return Object.keys(response).map((categoryId) => {
        return {
          ...response[categoryId],
          id: categoryId
        }
      });
    }

    return [];
  }
);

export const getCategoryById = createAsyncThunk<ICategory | null, string>(
  "categories/getCategoryById",
  async (id) => {
    const {data: response} = await axiosApi.get<ICategoryMutation>(`/categories/${id}.json`);

    if (response === null) return null;

    return {
      ...response,
      id: id
    };
  }
);

export const addCategory = createAsyncThunk<void, ICategoryMutation>(
  "categories/addCategory",
  async (formCategory) => {
    await axiosApi.post("/categories.json", formCategory);
  }
);

export const deleteCategoryById = createAsyncThunk<void, string>(
  "categories/deleteCategoryById",
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  }
);

export const editCategory = createAsyncThunk<void, {
  id: string,
  editedCategory: ICategoryMutation
}>(
  "categories/editCategory",
  async ({id, editedCategory}) => {
    await axiosApi.put(`/categories/${id}.json`, editedCategory);
  }
);


export const {clearCategory} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;