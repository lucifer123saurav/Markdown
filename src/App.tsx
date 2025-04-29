import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { RootState } from "./store";

const App = () => {
  const [editorContent, setEditiorContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const data = useSelector((state: RootState) => state.data);
  const theme = useSelector((state: RootState) => state.theme.darkMode);

  const activeItem = useSelector(
    (state: RootState) => state.current.currentItem
  );

  useEffect(() => {
    const activeData = data.filter((item) => item.id === activeItem);
    setEditiorContent(activeData[0].content);
  }, [activeItem]);

  return (
    <div
      className={`grid  ${
        isSidebarOpen ? "grid-cols-[250px_auto]" : "grid-cols-[0_100%]"
      } ${theme ? "dark" : ""} overflow-hidden ease-in-out duration-300`}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`relative w-100 h-[100vh]`}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          editorContent={editorContent}
        />

        <Editor value={editorContent}  isSidebarOpen={isSidebarOpen} setEditiorContent={setEditiorContent} />
      </div>
    </div>
  );
};

export default App;
