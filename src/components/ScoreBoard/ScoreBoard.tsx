import React from "react";
import "./ScoreBoard.css";
import _reducer, { type State, type Action } from "./reducer";
import { persistentReducer, loadState } from "./persistentReducer";
import ModalInput from "../ModalInput";
import IconCrown from "@tabler/icons/outline/crown.svg";
import IconMenu from "@tabler/icons/outline/menu-2.svg";
import Drawer from "../Drawer";

const PERSISTENCE_KEY = "scoreboard";
const reducer = persistentReducer(_reducer, PERSISTENCE_KEY);

const tailList = <T,>(xs: T[], maxLength: number): T[] => {
  if (!xs) return xs;
  if (xs.length <= maxLength) return xs;
  else {
    return xs.slice(xs.length - maxLength);
  }
};

const MAX_PARTIAL_LENGTH = 8;
const ScoreBoard: React.FC = () => {
  const [state, dispatch] = React.useReducer<typeof reducer, string>(
    reducer,
    null,
    (x): State =>
      reducer(
        loadState(PERSISTENCE_KEY, {
          teams: [],
        })
      )
  );
  const [selectedPartial, setSelectedPartial] = React.useState<{
    teamId;
    round;
    partial;
  }>();
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <>
      <div className="scoreboard">
        <div className="actions">
          <button
            className="btn-icon"
            type="button"
            onClick={() => setOpenMenu(true)}
          >
            <span className="sr-only">Open menu</span>
            <IconMenu />
          </button>
        </div>
        <div className="teams">
          {state.teams.map((team, i) => (
            <div key={i} className="team">
              <div className="name">{team.name}</div>

              <div className="score">
                {team.leader && <IconCrown />} {team.score}
              </div>

              <div className="partials">
                {team?.partials?.length > MAX_PARTIAL_LENGTH && (
                  <div className="partial">...</div>
                )}
                {tailList(team?.partials, MAX_PARTIAL_LENGTH)?.map(
                  (partial, j) => (
                    <button
                      key={j}
                      className="partial"
                      onClick={() =>
                        setSelectedPartial({
                          teamId: team.id,
                          partial,
                          round: j,
                        })
                      }
                    >
                      <span className="partial-round-number">{j + 1}</span>
                      {partial}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="partial"
                  onClick={() =>
                    setSelectedPartial({
                      teamId: team.id,
                      partial: 0,
                      round: team?.partials?.length ?? 0,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {[
          selectedPartial && (
            <ModalInput
              type="number"
              inputId={`${selectedPartial.teamId}-${selectedPartial.round}`}
              onClose={() => setSelectedPartial(null)}
              startingValue={selectedPartial.partial}
              key={`${selectedPartial.teamId}-${selectedPartial.round}`}
              onSetValue={(partial) =>
                dispatch({
                  type: "SET_PARTIAL",
                  payload: { ...selectedPartial, partial },
                })
              }
              onDeletePartial={() =>
                dispatch({
                  type: "REMOVE_PARTIAL",
                  payload: { ...selectedPartial },
                })
              }
            />
          ),
        ]}
      </div>
      <Drawer open={openMenu} setOpen={setOpenMenu} title="Menu">
        <div className="flex flex-col gap-2">
          <button
            className="btn"
            type="button"
            onClick={() => dispatch({ type: "ADD_TEAM" })}
          >
            Add team
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => dispatch({ type: "REMOVE_TEAM" })}
          >
            Remove team
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => dispatch({ type: "RESET_SCORES" })}
          >
            Reset scores
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default ScoreBoard;
