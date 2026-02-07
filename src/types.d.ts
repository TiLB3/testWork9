interface ICategory{
  type: "income" | "expense";
  name: string;
  id: string;
}

type ICategoryMutation = Omit<ICategory, "id">;

interface ICategoryApi {
  [key: string]: ICategoryMutation;
}

interface ITransaction {
  category: string;
  amount: number;
  createdAt: string;
}

interface ITransactionApi {
  [key: string]: ITransaction;
}

