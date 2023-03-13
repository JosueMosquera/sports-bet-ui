import { useEffect, useReducer } from "react";
import { User } from "../../../types/user";
import { api } from "../../../utils/axios";
import Swal from "sweetalert2";
import { Match } from "../../../types/matches";
import { useNavigate } from "react-router-dom";

type GetMatches = {
  type: "get-matches";
  payload: {
    matches: Match[];
  };
};

type GetTeams = {
  type: "GET_TEAMS";
  payload: {
    teams: any[];
  };
};

type HandleEditMatchData = {
  type: "HANDLE_EDIT_MATCH_DATA";
  payload: {
    fieldEdit: any;
    valueEdit: any;
  };
};

type SelectMatchToEdit = {
  type: "SELECT_MATCH_TO_EDIT";
  payload: {
    match: any;
  };
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
  | ChangeInputValue
  | GetMatches
  | ChangeOptionValue
  | GetTeams
  | SelectMatchToEdit
  | HandleEditMatchData;

type MatchData = {
  teamA: number | null;
  teamB: number | null;
  matchDate: string;
  betOffer: number | null;
};

const initialMatchData: MatchData = {
  teamA: null,
  teamB: null,
  matchDate: "",
  betOffer: null,
};

type MatchEditData = {
  teamA: number | null;
  teamB: number | null;
  matchDate: string;
  betOffer: number | null;
};

const initalMatchEditData: MatchEditData = {
  teamA: null,
  teamB: null,
  matchDate: "",
  betOffer: null,
};

type State = {
  betOption: {
    name: any;
    value: any;
  };
  matches: Match[];
  teams: { label: string; value: string }[];
  matchData: MatchData;
  selectedMatch: Match | null;
  matchEditData: MatchEditData;
};
const initalState: State = {
  betOption: {
    name: "",
    value: false,
  },
  matches: [],
  teams: [],
  matchData: initialMatchData,
  selectedMatch: null,
  matchEditData: initalMatchEditData,
};

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "get-matches":
      const { matches } = action.payload;
      return {
        ...state,
        matches,
      };

    case "change-input-value":
      const { field, value } = action.payload;
      return {
        ...state,
        matchData: {
          ...state.matchData,
          [field]: value,
        },
      };

    case "GET_TEAMS":
      const { teams } = action.payload;
      return {
        ...state,
        teams: teams.map((team) => ({
          label: team.name,
          value: team.id,
        })),
      };

    case "change-option-value":
      const { betOption } = action.payload;
      return {
        ...state,
        betOption,
      };

    case "HANDLE_EDIT_MATCH_DATA":
      const { fieldEdit, valueEdit } = action.payload;
      return {
        ...state,
        matchEditData: {
          ...state.matchEditData,
          [fieldEdit]: valueEdit,
        },
      };

    case "SELECT_MATCH_TO_EDIT":
      const { match } = action.payload;
      return {
        ...state,
        selectedMatch: match,
      };

    default:
      return state;
  }
};
interface ReducerValue extends State {
  changeInputValue: (field: string, value: any) => void;
  changeOptionValue: (betOption: { name: any; value: any }) => void;
  createMatch: () => Promise<void>;
  handleEditMatchData: (fieldEdit: any, valueEdit: any) => void;
  selectMatch: (match: any) => void;
  editMatch: () => Promise<void>;
  finishMatch: (matchId: number) => Promise<void>;
  startMatch: (matchId: number) => Promise<void>;
}
export const useMatchesReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const getMatches = async () => {
    const { data: matches } = await api.get(`/matches`);
    dispatch({
      type: "get-matches",
      payload: {
        matches,
      },
    });
  };

  const getTeams = async () => {
    const { data } = await api.get(`/teams`);

    dispatch({ type: "GET_TEAMS", payload: { teams: data } });
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

  const handleEditMatchData = (fieldEdit: any, valueEdit: any) => {
    dispatch({
      type: "HANDLE_EDIT_MATCH_DATA",
      payload: { fieldEdit, valueEdit },
    });
  };

  const selectMatch = (match: Match) => {
    dispatch({ type: "SELECT_MATCH_TO_EDIT", payload: { match } });
  };

  const createMatch = async () => {
    try {
      await api.post("matches", {
        ...state.matchData,
      });
      Swal.fire({ title: "Se creo el partido con exito", icon: "success" });
      await getMatches();
    } catch (error) {
      console.error(error);
    }
  };

  const editMatch = async () => {
    if (state.selectedMatch) {
      const { teamA, betOffer, matchDate, teamB } = state.matchEditData;
      try {
        await api.patch(`matches/${state.selectedMatch.id}`, {
          ...(teamA && { teamA }),
          ...(teamB && { teamB }),
          ...(betOffer && { betOffer }),
          ...(matchDate && { matchDate }),
        });
        Swal.fire({
          title: "partido editado con exito",
          icon: "success",
        });
        getMatches();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startMatch = async (matchId: number) => {
    try {
      await api.patch(`matches/${matchId}`, {
        isMatchStarted: true,
      });
      Swal.fire({
        title: "Partido iniciado",
        icon: "success",
      });
      getMatches();
    } catch (error) {
      console.error(error);
    }
  };

  const finishMatch = async (matchId: number) => {
    if (state.betOption) {
      try {
        await api.patch(`matches/${matchId}`, {
          result: state.betOption.name,
          isMatchFinished: true,
        });
        Swal.fire({
          title: "partido finalizado con exito",
          icon: "success",
        });
        getMatches();
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: "escoja una opcion para guardar los resultados",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getMatches();
    getTeams();
    //eslint-disable-next-line
  }, []);

  return {
    ...state,
    changeInputValue,
    changeOptionValue,
    createMatch,
    handleEditMatchData,
    selectMatch,
    editMatch,
    finishMatch,
    startMatch,
  };
};
