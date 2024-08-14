import React from "react";
import CloseIcon from "@tabler/icons/outline/x.svg";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";

export type DrawerProps = React.PropsWithChildren & {
  title: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Drawer: React.FC<DrawerProps> = ({ title, children, open, setOpen }) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4"></div>
              </TransitionChild>
              <div className="flex h-full flex-col bg-white py-6 shadow-xl dark:bg-gray-700 dark:text-white">
                <div className="px-4 sm:px-6 flex justify-between">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-50">
                    {title ?? null}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => setOpen?.(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <CloseIcon alt="close" height={20} width={20} />
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {(open && children) || null}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
