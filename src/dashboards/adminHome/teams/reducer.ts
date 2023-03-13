import { api } from "../../../utils/axios";
import { useEffect, useReducer } from "react";
import Swal from "sweetalert2";

type GetTeams = {
  type: "GET_TEAMS";
  payload: {
    teams: any[];
  };
};

type HandleTeamData = {
  type: "HANDLE_TEAM_DATA";
  payload: {
    field: any;
    value: any;
  };
};

type HandleEditTeamData = {
  type: "HANDLE_EDIT_TEAM_DATA";
  payload: {
    fieldEdit: any;
    valueEdit: any;
  };
};

type SelectTeamToEdit = {
  type: "SELECT_TEAM_TO_EDIT";
  payload: {
    team: any;
  };
};

type ActionTypes =
  | GetTeams
  | HandleTeamData
  | HandleEditTeamData
  | SelectTeamToEdit;

type TeamData = {
  name: string | Blob;
  teamImage: string | Blob;
};

const initalTeamData: TeamData = {
  name: "",
  teamImage: "",
};
const initalTeamEditData: TeamEditData = {
  name: "",
  teamImage: "",
};

type TeamEditData = {
  name: string | Blob;
  teamImage: string | Blob;
};

type State = {
  teams: any[];
  teamData: TeamData;
  selectedTeam: any;
  teamEditData: TeamEditData;
};

const initialState: State = {
  teams: [],
  teamData: initalTeamData,
  selectedTeam: null,
  teamEditData: initalTeamEditData,
};
const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "GET_TEAMS":
      const { teams } = action.payload;
      return {
        ...state,
        teams,
      };

    case "HANDLE_TEAM_DATA":
      const { field, value } = action.payload;
      return {
        ...state,
        teamData: {
          ...state.teamData,
          [field]: value,
        },
      };

    case "HANDLE_EDIT_TEAM_DATA":
      const { fieldEdit, valueEdit } = action.payload;
      return {
        ...state,
        teamEditData: {
          ...state.teamEditData,
          [fieldEdit]: valueEdit,
        },
      };

    case "SELECT_TEAM_TO_EDIT":
      const { team } = action.payload;
      return {
        ...state,
        selectedTeam: team,
      };

    default:
      return state;
  }
};
export const useTeamsReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);

  const getTeams = async () => {
    const { data } = await api.get(`/teams`);

    dispatch({ type: "GET_TEAMS", payload: { teams: data } });
  };

  const handleTeamData = (field: any, value: any) => {
    dispatch({ type: "HANDLE_TEAM_DATA", payload: { field, value } });
  };

  const handleEditTeamData = (fieldEdit: any, valueEdit: any) => {
    dispatch({
      type: "HANDLE_EDIT_TEAM_DATA",
      payload: { fieldEdit, valueEdit },
    });
  };

  const selectTeam = (team: any) => {
    dispatch({ type: "SELECT_TEAM_TO_EDIT", payload: { team } });
  };

  const editTeam = async () => {
    if (state.selectedTeam) {
      try {
        await api.patch(`teams/${state.selectedTeam.id}`, {
          name: state.teamEditData.name,
        });
        if (state.teamEditData.teamImage) {
          const formData = new FormData();
          formData.append("file", state.teamEditData.teamImage);
          await api.patch(`/teams/${state.selectedTeam.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        Swal.fire({
          title: "equipo editado con exito",
          icon: "success",
        });
        getTeams();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createTeam = async () => {
    const { name, teamImage } = state.teamData;
    try {
      const { data: newTeam } = await api.post("/teams", { name });
      if (newTeam) {
        const formData = new FormData();
        formData.append("file", teamImage);
        await api.patch(`/teams/${newTeam.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          title: "equipo creado con exito",
          icon: "success",
        });
        getTeams();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTeam = async (teamId: number) => {
    try {
      await api.delete(`/teams/${teamId}`);
      await getTeams();
      Swal.fire({
        title: "equipo borrado",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "ocurrio un error al borrar el equipo",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return {
    ...state,
    handleTeamData,
    createTeam,
    editTeam,
    selectTeam,
    handleEditTeamData,
    deleteTeam,
  };
};
