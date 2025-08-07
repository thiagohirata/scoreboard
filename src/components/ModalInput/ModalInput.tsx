import React from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./ModalInput.css";

type P<T> = {
  onClose: (open: boolean) => void;
  startingValue?: T;
  inputId?: string;
  onSetValue: (value: T) => void;
  onDelete?: () => void;
};

type ScoreInputProps =
  | ({
      type: "number";
    } & P<number>)
  | ({
      type: "string";
    } & P<string>);

const ScoreInput: React.FC<ScoreInputProps> = ({
  inputId,
  onClose,
  startingValue,
  onSetValue,
  onDelete,
  type,
}) => {
  const inputRef = React.useRef<HTMLInputElement>();

  const [score, setScore] = React.useState<string>(
    () => startingValue?.toString() || ""
  );

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScore(event.target.value);
    if (event.target.value) {
      const score = event.target.value
      const value = type === "string" ? score : parseInt(score);
      onSetValue(value as never);
    }
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = type === "string" ? score : parseInt(score);
    onSetValue(value as never);
    onClose(false);
  };

  return (
    <>
      <dialog
        open={true}
        aria-labelledby="dialog-title"
        className="fixed top-[200px] rounded-lg bg-white dark:bg-gray-600 shadow-xl px-4 py-4 mx-auto backdrop:bg-gray-50 w-[300px]"
      >
        <form onSubmit={onFormSubmit}>
          <div className="text-gray-900 flex flex-col gap-3 dark:text-white">
            <div className="flex items-center rounded-md text-gray-900 bg-white dark:bg-gray-900 dark:text-white pl-3 pr-2">
              <input
                id={inputId}
                ref={inputRef}
                onChange={handleScoreChange}
                autoFocus
                name="partial"
                type={type}
                required
                step={type === "number" ? 1 : undefined}
                className="block min-w-0 grow focus:outline-none px-3 py-2 ring-inset text-5xl text-gray-900 bg-white dark:bg-gray-900 dark:text-white"
                value={score}
              />
            </div>

            <div className="flex justify-end mt-2">
              {onDelete && (
                <button
                  type="button"
                  className="mr-auto btn"
                  onClick={() => {
                    onDelete?.();
                    onClose(false);
                  }}
                >
                  Delete
                </button>
              )}
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" /> */}
        {/* <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        </div> */}
      </dialog>
    </>
  );
};

export default ScoreInput;
