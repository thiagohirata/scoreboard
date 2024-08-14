import React from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type ScoreInputProps = {
  onClose: (open: boolean) => void;
  startingValue: number;
  inputId: string;
  onSetValue: (value: number) => void;
  onDeletePartial: () => void;
};

const ScoreInput: React.FC<ScoreInputProps> = ({
  inputId,
  onClose,
  startingValue,
  onSetValue,
  onDeletePartial,
}) => {
  const inputRef = React.useRef<HTMLInputElement>();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    if (!open) {
      const timeoutId = setTimeout(() => {
        onClose(open);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      inputRef?.current?.select();
    }
  }, [open]);

  const [score, setScore] = React.useState<string>(() =>
    startingValue?.toString()
  );

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScore(event.target.value);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSetValue(parseInt(score));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            key={inputId}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form onSubmit={onFormSubmit}>
              <div className="bg-white px-4 py-4 flex flex-col gap-3">
                <input
                  ref={inputRef}
                  onChange={handleScoreChange}
                  name="partial"
                  type="number"
                  required
                  step={1}
                  className="block w-full rounded-md border-0 ring-1 px-3 py-2 text-gray-900 focus:ring-inset focus:ring-indigo-600 text-6xl"
                  value={score}
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      onDeletePartial?.();
                      setOpen(false);
                    }}
                  >
                    Delete
                  </button>
                  <button type="submit">Submit</button>
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
