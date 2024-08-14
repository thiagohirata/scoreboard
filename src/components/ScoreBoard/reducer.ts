import { validateHeaderValue } from "http";
import { nanoid } from "nanoid";
import type React from "react";

type Team = {
  id: string;
  name: string;
  partials?: number[];
  score: number;
  leader: number;
};

export type State = {
  teams: Team[];
};

export type Action =
  | {
      type: "ADD_TEAM";
    }
  | {
      type: "REMOVE_TEAM";
      payload?: {
        index: number;
      };
    }
  | {
      type: "SET_PARTIAL";
      payload?: {
        teamId: string;
        round: number;
        partial: number;
      };
    }
  | {
      type: "REMOVE_PARTIAL";
      payload?: {
        teamId: string;
        round: number;
      };
    }
  | {
      type: "RESET_SCORES";
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_TEAM":
      return {
        ...state,
        teams: [
          ...state.teams,
          {
            id: nanoid(),
            name: `Team ${state.teams?.length + 1}`,
            score: 0,
          },
        ],
      };
    case "REMOVE_TEAM":
      const removeIndex = action.payload?.index || state.teams?.length - 1;
      return {
        ...state,
        teams: state.teams.filter((team, index) => index !== removeIndex),
      };
    case "SET_PARTIAL":
      return {
        ...state,
        teams: state.teams.map((team) => {
          if (team.id === action.payload?.teamId) {
            const partials = team.partials ? [...team.partials] : [];
            partials[action.payload.round] = action.payload?.partial;
            return {
              ...team,
              partials,
              score: partials.reduce((a, b) => a + (b || 0), 0),
            };
          } else {
            return team;
          }
        }),
      };
    case "REMOVE_PARTIAL":
      return {
        ...state,
        teams: state.teams.map((team) => {
          if (team.id === action.payload?.teamId) {
            const partials = [...team.partials] || [];
            partials.splice(action.payload?.round, 1);
            return {
              ...team,
              partials,
              score: partials.reduce((a, b) => a + (b || 0), 0),
            };
          } else {
            return team;
          }
        }),
      };
    case "RESET_SCORES":
      return {
        ...state,
        teams: state.teams.map((team) => ({
          ...team,
          score: 0,
          partials: [],
        })),
      };
    default:
      return state;
  }
};

export default reducer;
