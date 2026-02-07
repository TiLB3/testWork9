import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../../axiosApi.ts";
import type {RootState} from "../store/store.ts";
import type {ICategory, ICategoryApi, ICategoryMutation} from "../../types";

interface ICategorySlice {
  categories: ICategory[];
  category: ICategory | null;
  loading: {
    addCategoryLoading: boolean;
    deleteCategoryLoading: boolean;
    fetchAllCategoryLoading: boolean;
  };
}

const initialState: ICategorySlice = {
  categories: [],
  category: null,
  loading: {
    addCategoryLoading: false,
    deleteCategoryLoading: false,
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
      state.loading.addCategoryLoading = true;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.loading.addCategoryLoading = false;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.loading.addCategoryLoading = false;
    });
  }
})


export const fetchAllCategories = createAsyncThunk<ICategory[], void | string>(
  "categories/fetchAllCategories",
  async (categories) => {
    const {data: response} = await axiosApi<ICategoryApi | null>(categories ? `/categories.json?orderBy="type"&equalTo="${categories}"` : "/categories.json");


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


export const getLoadingForm = (state: RootState) => state.categories.loading.addCategoryLoading;
export const getLoadingAllCategories = (state: RootState) => state.categories.loading.fetchAllCategoryLoading;
export const getLoadingDelete = (state: RootState) => state.categories.loading.deleteCategoryLoading;
export const getCategory = (state: RootState) => state.categories.category;
export const getCategories = (state: RootState) => state.categories.categories;


export const {clearCategory} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;