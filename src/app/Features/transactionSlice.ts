import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosApi} from "../../axiosApi.ts";
import type {RootState} from "../store/store.ts";
import type {
  ITransaction,
  ITransactionApi,
  ITransactionWithoutId
} from "../../types";

interface ITransactionSlice {
  transactions: ITransaction[];
  loading: {
    addTransactionLoading: boolean;
    deleteTransactionLoading: boolean;
    fetchAllTransactionLoading: boolean;
  };
}

const initialState: ITransactionSlice = {
  transactions: [],
  loading: {
    addTransactionLoading: false,
    deleteTransactionLoading: false,
    fetchAllTransactionLoading: false,
  }
}

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.loading.fetchAllTransactionLoading = true;
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state,{payload}) => {
      state.loading.fetchAllTransactionLoading = false;
      state.transactions = payload;
    });
    builder.addCase(fetchAllTransactions.rejected, (state) => {
      state.loading.fetchAllTransactionLoading = false;
    });

    builder.addCase(addTransaction.pending, (state) => {
      state.loading.addTransactionLoading = true;
    });
    builder.addCase(addTransaction.fulfilled, (state) => {
      state.loading.addTransactionLoading = false;
    });
    builder.addCase(addTransaction.rejected, (state) => {
      state.loading.addTransactionLoading = false;
    });


    builder.addCase(deleteTransactionById.pending, (state) => {
      state.loading.deleteTransactionLoading = true;
    });
    builder.addCase(deleteTransactionById.fulfilled, (state) => {
      state.loading.deleteTransactionLoading = false;
    });
    builder.addCase(deleteTransactionById.rejected, (state) => {
      state.loading.deleteTransactionLoading = false;
    });


    builder.addCase(editTransaction.pending, (state) => {
      state.loading.addTransactionLoading = true;
    });
    builder.addCase(editTransaction.fulfilled, (state) => {
      state.loading.addTransactionLoading = false;
    });
    builder.addCase(editTransaction.rejected, (state) => {
      state.loading.addTransactionLoading = false;
    });
  }
})


export const fetchAllTransactions = createAsyncThunk<ITransaction[]>(
  "transactions/fetchAllTransactions",
  async () => {
    const {data: response} = await axiosApi.get<ITransactionApi | null>("/transactions.json");

    if (response) {
      return Object.keys(response).map((transactionsId) => {
        return {
          ...response[transactionsId],
          id: transactionsId
        }
      });
    }

    return [];
  }
);


export const addTransaction = createAsyncThunk<void, ITransactionWithoutId>(
  "transactions/addTransaction",
  async (formCategory) => {
    await axiosApi.post("/transactions.json", formCategory);
  }
);

export const deleteTransactionById = createAsyncThunk<void, string>(
  "transactions/deleteTransactionById",
  async (id) => {

    await axiosApi.delete(`/transactions/${id}.json`);
  }
);

export const editTransaction = createAsyncThunk<void, {
  id: string,
  editedTransactions: ITransactionWithoutId,
}>(
  "transactions/editTransaction",
  async ({id, editedTransactions}) => {
    await axiosApi.put(`/transactions/${id}.json`, editedTransactions);
  }
);


export const getLoadingFormTransaction = (state: RootState) => state.transactions.loading.addTransactionLoading;
export const getLoadingAllTransactions = (state: RootState) => state.transactions.loading.fetchAllTransactionLoading;
export const getLoadingDeleteTransactios = (state: RootState) => state.transactions.loading.deleteTransactionLoading;
export const getTransactions = (state: RootState) => state.transactions.transactions;


export const transactionReducer = transactionSlice.reducer;