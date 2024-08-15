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
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // dispara o efeito de transição ao dar o mount
    setOpen(true);
  }, []);

  const [score, setScore] = React.useState<string>(() =>
    startingValue?.toString()
  );

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScore(event.target.value);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = type === "string" ? score : parseInt(score);
    onSetValue(value as never);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center text-center p-2 items-end">
          <DialogPanel
            key={inputId}
            transition
            onTransitionEnd={(e) => {
              if (!open) {
                onClose(open);
              } else {
                inputRef?.current?.focus();
                inputRef?.current?.select();
              }
            }}
            className="mb-[50vh] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <form onSubmit={onFormSubmit}>
              <div className="bg-white text-gray-900 px-4 py-4 flex flex-col gap-3 dark:bg-gray-700 dark:text-white">
                <input
                  ref={inputRef}
                  onChange={handleScoreChange}
                  autoFocus
                  name="partial"
                  type={type}
                  required
                  step={type === "number" ? 1 : undefined}
                  className="block w-full rounded-md border-0 ring-1 px-3 py-2 ring-inset text-5xl text-gray-900 bg-white dark:bg-gray-900 dark:text-white"
                  value={score}
                />
                <div className="flex justify-end mt-2">
                  {onDelete && (
                    <button
                      type="button"
                      className="mr-auto btn"
                      onClick={() => {
                        onDelete?.();
                        setOpen(false);
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ScoreInput;
