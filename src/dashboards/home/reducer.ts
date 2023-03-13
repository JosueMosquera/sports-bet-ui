import { useEffect, useReducer } from "react";
import { User } from "../../types/user";
import { api } from "../../utils/axios";
import Swal from "sweetalert2";
import { Match } from "../../types/matches";
import { MatchPrediction } from "../../types/matchesPredictions";
import { useNavigate } from "react-router-dom";
type GetUser = {
  type: "get-user";
  payload: {
    user: User;
  };
};

type GetMatches = {
  type: "get-matches";
  payload: {
    matches: Match[];
  };
};

type GetMatchesPredictions = {
  type: "get-matches-predictions";
  payload: {
    matchPredictions: MatchPrediction[];
  };
};

type AddCredits = {
  type: "add-credits";
};

type PredictMatch = {
  type: "predict-match";
};

type ChangeInputValue = {
  type: "change-input-value";
  payload: {
    field: string;
    value: any;
  };
};

type ChangeOptionValue = {
  type: "change-option-value";
  payload: {
    betOption: {
      name: any;
      value: any;
    };
  };
};

type ActionTypes =
  | GetUser
  | ChangeInputValue
  | AddCredits
  | GetMatches
  | ChangeOptionValue
  | GetMatchesPredictions
  | PredictMatch;

type State = {
  user: User | null;
  ammount: number | string;
  creditCardCode: string | null;
  betAmmount: number | string;
  betCreditCardCode: string | null;
  betOption: {
    name: any;
    value: any;
  };
  matches: Match[];
  matchPredictions: MatchPrediction[];
};
const initalState: State = {
  user: null,
  ammount: "",
  betAmmount: "",
  betCreditCardCode: "",
  creditCardCode: "",
  betOption: {
    name: "",
    value: false,
  },
  matches: [],
  matchPredictions: [],
};

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "get-user":
      const { user } = action.payload;
      return {
        ...state,
        user,
      };

    case "get-matches":
      const { matches } = action.payload;
      return {
        ...state,
        matches,
      };

    case "get-matches-predictions":
      const { matchPredictions } = action.payload;
      return {
        ...state,
        matchPredictions,
      };

    case "change-input-value":
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };

    case "change-option-value":
      const { betOption } = action.payload;
      return {
        ...state,
        betOption,
      };

    case "add-credits":
      return {
        ...state,
        ammount: "",
        creditCardCode: "",
      };

    case "predict-match":
      return {
        ...state,
        betAmmount: "",
        betCreditCardCode: "",
        betOpion: false,
      };

    default:
      return state;
  }
};
interface ReducerValue extends State {
  addCredits: () => void;
  predictMatch: (match: any) => void;
  editPredictMatch: (predictionId: number, match: any) => void;
  removePredictMatch: (match: any) => void;
  changeInputValue: (field: string, value: any) => void;
  changeOptionValue: (betOption: { name: any; value: any }) => void;
}
export const useCreditsReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);
  const navigate = useNavigate();
  const getUser = async () => {
    if (parsedUser && !parsedUser.isAdmin) {
      const { data } = await api.get(`/auth/${parsedUser.id}`);
      dispatch({
        type: "get-user",
        payload: { user: data },
      });
    } else {
      navigate("/login");
    }
  };

  const getMatches = async () => {
    const { data: matches } = await api.get(`/matches`);
    dispatch({
      type: "get-matches",
      payload: {
        matches,
      },
    });
  };

  const getMatchPredictions = async () => {
    const { data: matchPredictions } = await api.get(`/match-predictions`);
    dispatch({
      type: "get-matches-predictions",
      payload: {
        matchPredictions,
      },
    });
  };

  const addCredits = async () => {
    try {
      await api.post("/credits", {
        ammount: state.ammount,
        type: "INGRESO",
        userId: state.user?.id,
        creditCardCode: state.creditCardCode,
      });
      dispatch({
        type: "add-credits",
      });
      Swal.fire({
        title: "creditos agregados con exito",
        icon: "success",
      });
      await getUser();
    } catch (error) {
      console.error(error);
    }
  };

  const editPredictMatch = async (predictionId: number, match: any) => {
    try {
      await api.patch(`/match-predictions/${predictionId}`, {
        userId: state.user?.id,
        match: match.id,
        [state.betOption.name]: state.betOption.value,
      });
      dispatch({
        type: "predict-match",
      });
      Swal.fire({
        title: "apuesta cambiada con exito.",
        icon: "success",
      });
      await getMatches();
      await getMatchPredictions();
      await getUser();
    } catch (error) {
      console.error(error);
    }
  };

  const removePredictMatch = async (matchId: number) => {
    try {
      await api.delete(`/match-predictions/${matchId}`);
      dispatch({
        type: "predict-match",
      });
      Swal.fire({
        title: "se elimino su apuesta.",
        icon: "success",
      });
      await getMatches();
      await getMatchPredictions();
      await getUser();
    } catch (error) {
      console.error(error);
    }
  };
  const predictMatch = async (match: any) => {
    try {
      await api.post("/match-predictions", {
        userId: state.user?.id,
        match: match.id,
        betOffer: match.betOffer,
        [state.betOption.name]: state.betOption.value,
        ammount: state.betAmmount,
        creditCardCode: state.betCreditCardCode,
      });
      dispatch({
        type: "predict-match",
      });
      Swal.fire({
        title: "apuesta registrada con exito.",
        icon: "success",
      });
      await getMatches();
      await getMatchPredictions();
      await getUser();
    } catch (error) {
      Swal.fire({
        title: "creditos insuficientes para realizar la apuesta.",
        icon: "error",
      });
      console.error(error);
    }
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

  const changeOptionValue = (betOption: { name: any; value: any }) => {
    dispatch({
      type: "change-option-value",
      payload: {
        betOption,
      },
    });
  };
  useEffect(() => {
    getUser();
    getMatches();
    getMatchPredictions();
    //eslint-disable-next-line
  }, []);
  return {
    ...state,
    addCredits,
    changeInputValue,
    predictMatch,
    changeOptionValue,
    editPredictMatch,
    removePredictMatch,
  };
};
