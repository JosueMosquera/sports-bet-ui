import { api } from "../../utils/axios";
import { useEffect, useReducer } from "react";

type GetTransactions = {
  type: "GET_TRANSACTIONS";
  payload: {
    myTransactions: any[];
  };
};

type ActionTypes = GetTransactions;

type State = {
  transactions: any[];
};

const initialState: State = {
  transactions: [],
};
const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      const { myTransactions } = action.payload;
      return {
        ...state,
        transactions: myTransactions,
      };

    default:
      return state;
  }
};
export const useTransactionsReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);

  const getMyTransactions = async () => {
    const { data } = await api.get(`/credits/by-user/${parsedUser.id}`);

    dispatch({ type: "GET_TRANSACTIONS", payload: { myTransactions: data } });
  };

  useEffect(() => {
    getMyTransactions();
  }, []);

  return {
    ...state,
  };
};
