export interface ICategory {
  type: string;
  name: string;
  id: string;
}

export type ICategoryMutation = Omit<ICategory, "id">;

export interface ICategoryApi {
  [key: string]: ICategoryMutation;
}

export interface ITransaction {
  category: string;
  amount: number;
  createdAt: string;
  id: string;
}


export interface ITransactionWithoutId {
  category: string;
  amount: number;
  createdAt: string;
}

export interface ITransactionMutation {
  category: string;
  amount: number;
  type: string;
}

export interface ITransactionApi {
  [key: string]: ITransactionWithoutId;
}

