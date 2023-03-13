import { useReducer } from "react";
import { NewUser, User } from "../../../types/user";
import { api } from "../../../utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type Login = {
  type: "login";
  payload: {
    user: User;
  };
};

type Register = {
  type: "register";
  payload: {
    newUser: NewUser;
  };
};

type ChangeInputValue = {
  type: "change-input-value";
  payload: {
    field: string;
    value: any;
  };
};

type ActionTypes = Login | Register | ChangeInputValue;

type State = {
  user: User | null;
  newUser: NewUser | null;
  loginUserEmail: string | null;
  loginUserPassword: string | null;
  registerUserEmail: string | null;
  registerUserPassword: string | null;
  registerUserName: string | null;
};
const initalState: State = {
  user: null,
  newUser: null,
  loginUserEmail: null,
  loginUserPassword: null,
  registerUserEmail: null,
  registerUserPassword: null,
  registerUserName: null,
};

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "login":
      const { user } = action.payload;
      return {
        ...state,
        user,
        loginUserEmail: null,
        loginUserPassword: null,
      };
    case "register":
      const { newUser } = action.payload;
      return {
        ...state,
        newUser,
        registerUserEmail: null,
        registerUserPassword: null,
        registerUserName: null,
      };

    case "change-input-value":
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };

    default:
      return state;
  }
};
interface ReducerValue extends State {
  register: () => void;
  changeInputValue: (field: string, value: any) => void;
}
export const useUserReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const navigate = useNavigate();

  const register = async () => {
    const { data } = await api.post("/auth", {
      userEmail: state.registerUserEmail,
      userName: state.registerUserName,
      password: state.registerUserPassword,
      isAdmin: true,
    });

    dispatch({
      type: "register",
      payload: { newUser: data.newUser },
    });
    Swal.fire({
      title: "Registro exitoso puede iniciar sesión.",
      icon: "success",
    });
  };

  const changeInputValue = (field: string, value: any) => {
    dispatch({
      type: "change-input-value",
      payload: {
        field,
        value,
      },
    });
  };

  return {
    ...state,
    register,
    changeInputValue,
  };
};
