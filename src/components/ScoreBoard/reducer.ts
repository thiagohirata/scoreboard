import { validateHeaderValue } from "http";
import { nanoid } from "nanoid";
import type React from "react";

type Team = {
  id: string;
  name: string;
  partials?: number[];
  score: number;
  leader?: boolean;
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
        teamId: string;
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
    }
  | {
      type: "SET_TEAM_NAME";
      payload?: {
        teamId: string;
        name: string;
      };
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  if (!action) return state;
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
      const removeIndex = action.payload?.teamId
        ? undefined
        : state.teams?.length - 1;
      return {
        ...state,
        teams: state.teams.filter((team, index) =>
          removeIndex != null
            ? index !== removeIndex
            : team.id !== action.payload.teamId
        ),
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
              score: partials?.reduce((a, b) => a + (b || 0), 0) ?? 0,
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
              score: partials?.reduce((a, b) => a + (b || 0), 0) ?? 0,
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
    case "SET_TEAM_NAME":
      return {
        ...state,
        teams: state.teams.map((team) => {
          if (team.id === action.payload?.teamId) {
            return {
              ...team,
              name: action.payload?.name,
            };
          } else {
            return team;
          }
        }),
      };
    default:
      return state;
  }
};

/**
 * Calculates leader
 * @param state
 * @param action
 * @returns
 */
const finalReducer: typeof reducer = (state: State, action: Action): State => {
  const newState = reducer(state, action);
  const largestScore = Math.max(...newState.teams.map((team) => team.score));
  return {
    ...newState,
    teams: newState.teams.map((team) => {
      return {
        ...team,
        leader: team.score == largestScore,
      };
    }),
  };
};

export default finalReducer;
