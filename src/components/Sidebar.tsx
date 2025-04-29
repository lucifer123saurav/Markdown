import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import { RootState } from "../store";
import FileSwitcher from "./FileSwitcher";
import { updateCurrentItem } from "../store/active-slice";
import { addItem } from "../store/data-slice";
import { getCreateDate } from "../helpers/utility";
import Switch from "./Switch";

interface SidberProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Sidebar(props: SidberProps) {
  const data = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();

  const newDocumentHandler = () => {
    // Generate unique ID
    const newPostId = uuidv4();
    const postDate = getCreateDate();
    // Dispatch add action
    dispatch(
      addItem({
        id: newPostId,
        createdAt: postDate,
        title: "new_document.md",
        content: "",
      })
    );
    dispatch(updateCurrentItem(newPostId));
    // Close Sidebar
    props.setIsSidebarOpen(false);
  };

  return (
    <div
      className={`bg-custom-dark-300 relative ${
        props.isSidebarOpen ? "left-0" : "left-[-250px]"
      } w-[250px] h-full overflow-x-hidden overflow-y-auto p-5 ease-in-out duration-300 flex-shrink-0`}
    >
      <a href="/" className="lg:block hidden mb-6">
        <img src="/icons/logo.svg" alt="Markdown" />
      </a>

      <span className="uppercase text-custom-grey-300 text-custom-text-heading-sm block tracking-[2px] mb-6">
        My Documents
      </span>
      <Button onClick={() => newDocumentHandler()} mode="primary" w="full">
        + New Document
      </Button>
      <div className="overflow-y-auto h-[calc(100vh-160px)] sm:h-[calc(100vh-200px)]">
        {data.map((item) => (
          <div className="mt-4" key={item.id}>
            <FileSwitcher
              onClick={() => dispatch(updateCurrentItem(item.id))}
              text={item.createdAt}
              title={item.title}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <Switch />
      </div>
    </div>
  );
}

export default Sidebar;
