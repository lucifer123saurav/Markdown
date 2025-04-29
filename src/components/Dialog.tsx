import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Button from "./Button";
import { RootState } from "../store";
import { toggleTheme } from "../store/theme-slice";

interface BackdropProps {
  toggleDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const Backdrop = (props: BackdropProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        onClick={() => props.toggleDialog(false)}
        className="fixed bg-custom-dark-400 dark:bg-custom-grey-300 opacity-50 left-0 top-0 w-full h-full z-10"
      ></div>
    </div>
  );
};

interface ModalDialogProps {
  dispatchAction: () => void;
  toggleDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDialog = (props: ModalDialogProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleDelete = () => {
    props.dispatchAction();
    props.toggleDialog(false);
  };
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-custom-white-100 dark:bg-custom-dark-300 antialiased rounded-[4px] px-6 py-7 z-20  w-[380px] sm:w-[90%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-custom-dark-100 dark:text-custom-white-100 text-custom-text-heading-dialog font-roboto-slab font-bold">
          Delete this document?
        </h2>
        <p className="text-custom-grey-300 dark:text-custom-grey-200 text-sm leading-6 my-6 font-roboto-slab">
          Are you sure you want to delete the document
          and its contents? This action cannot be reversed.
        </p>
        <Button mode="primary" w="full" onClick={handleDelete}>
          Confirm &amp; Delete
        </Button>
      </div>
    </div>
  );
};

interface DialogProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchAction: () => void;
}
const Dialog = (props: DialogProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleDialog={props.setShowDialog} />,
        document.getElementById("backdrop")!
      )}
      {ReactDOM.createPortal(
        <ModalDialog
          dispatchAction={props.dispatchAction}
          toggleDialog={props.setShowDialog}
        />,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Dialog;
