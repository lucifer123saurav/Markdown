import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";
import { addItem, deleteItem, updateItem } from "../store/data-slice";
import { updateCurrentItem } from "../store/active-slice";
import { getCreateDate } from "../helpers/utility";
import Button from "./Button";
import FileDetail from "./FileDetail";
import Dialog from "./Dialog";
interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorContent: string;
}

const Header = (props: HeaderProps) => {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const activeItem = useSelector(
    (state: RootState) => state.current.currentItem
  );

  const activeData = data.filter((item) => item.id === activeItem);
  const [filename, setFileName] = useState(activeData[0].title);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    setFileName(activeData[0].title);
    // Check and clear alert
    if (alert !== "") {
      setTimeout(() => {
        setAlert("");
      }, 4000);
    }
  }, [activeItem, alert]);

  // Save current item.
  const saveHandler = () => {
    // Get the update date
    const updatedDate = getCreateDate();
    // Format file name
    let saveFilename = filename;
    const filenameParts = saveFilename.toLowerCase().split(".");
    if (filenameParts[filenameParts.length - 1] !== "md") {
      saveFilename += ".md";
      setFileName(saveFilename);
    }
    // Data to update
    const updatedData = {
      id: activeItem,
      title: saveFilename,
      content: props.editorContent,
      createdAt: updatedDate,
    };
    dispatch(updateItem(updatedData));
    setAlert("Document saved!");
  };

  // Delete current item.
  const deleteHandler = () => {
    // setDeleted(true);
    if (data.length !== 1) {
      // Creates a copy of the actual data store and filter out the item that has the same id as the activeItem
      const deletedDataCopy = [...data].filter(
        (item) => item.id !== activeItem
      );
      // Selects the id of the fist item in the deleted array and set it as the active item.
      const updatedCurrentId = deletedDataCopy[deletedDataCopy.length - 1].id;

      dispatch(deleteItem(activeItem));
      dispatch(updateCurrentItem(updatedCurrentId));
    } else {
      // Generate unique ID
      const newPostId = uuidv4();
      const postDate = getCreateDate();
      // Dispatch add action (Add new document)
      dispatch(
        addItem({
          id: newPostId,
          createdAt: postDate,
          title: "new_document.md",
          content: "",
        })
      );
      dispatch(deleteItem(activeItem));
      dispatch(updateCurrentItem(newPostId));
    }
    setAlert("Document deleted!");
  };

  return (
    <>
      <div className="w-screen h-[72px] bg-red-100 bg-custom-dark-200 flex items-center justify-between fixed pr-4 z-50">
        <div className="flex h-full items-center">
          <button
            onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
            className="w-[72px] h-full flex justify-center items-center bg-custom-dark-100 mr-6"
            aria-label="Toggle Menu"
          >
            {!props.isSidebarOpen ? (
              <img src="/icons/icon-menu.svg" alt="Open Menu" />
            ) : (
              <img src="/icons/icon-close.svg" alt="Close Menu" />
            )}
          </button>
          <a href="/" className="lg:hidden">
            <img src="icons/logo.svg" alt="Markdown" />
          </a>
          <span className="w-px h-10 bg-custom-grey-400 block mx-6 lg:hidden"></span>
          <FileDetail
            text="Document Name"
            title={filename}
            onChange={setFileName}
          />
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => setShowDialog(!showDialog)}
            mode="transparent"
            icon="delete"
            className="mr-6"
          />
          <Button onClick={() => saveHandler()} mode="primary" icon="save">
            Save Changes
          </Button>
        </div>

        {showDialog && (
          <Dialog
            dispatchAction={deleteHandler}
            setShowDialog={setShowDialog}
          />
        )}
      </div>
      {alert && (
        <div className="bg-custom-dark-100 text-custom-white-100 rounded-lg p-4 fixed left-[50%] bottom-8 -translate-x-1/2 transition-all animate-fade z-50">
          {alert}
        </div>
      )}
    </>
  );
};

export default Header;
