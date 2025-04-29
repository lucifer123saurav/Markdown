import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Button from "./Button";
import ReactMarkdown from "react-markdown";

interface EditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  isSidebarOpen: boolean;
  setEditiorContent: (item: string) => void;
}
const Editor = (props: EditorProps) => {
  const [text, setText] = useState(props.value);
  const [isFullWidthPrevieOn, setIsFullWidthPrevieOn] = useState(false);
  // const editorRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    setText(props.value);
  }, [props.value]);

  const handleChange = (text: string) => {
    setText(text);
    props.setEditiorContent(text);
  };

  return (
    <div className="flex items-stretch h-[calc(100vh_-_114px)] relative top-[114px] overflow-hidden">
      {!isFullWidthPrevieOn && (
        <div className="w-1/2 h-full sm:w-full">
          <div
            className={`h-[42px] bg-custom-white-200 dark:bg-custom-dark-300 flex items-center border-r border-r-custom-grey-100 dark:border-r-custom-grey-400 px-5 duration-300 ease-in-out fixed top-[72px] ${
              isFullWidthPrevieOn ? "w-1/2" : "w-full"
            }`}
          >
            <span className="text-custom-text-heading-sm uppercase tracking-[2px] text-custom-grey-300 dark:text-custom-grey-200 duration-300 ease-in-out">
              Markdown
            </span>
          </div>
          <textarea
            onChange={(e) => handleChange(e.target.value)}
            className=" w-full h-full resize-none focus:outline-none px-5 py-3 border-r border-r-custom-grey-100 dark:border-r-custom-grey-400 font-roboto-mono font-light text-custom-text-heading-sm leading-[24px] dark:bg-custom-dark-400 dark:text-custom-grey-200 duration-300 ease-in-out"
            {...props}
            value={text}
          ></textarea>
        </div>
      )}
      <div
        className={`${
          isFullWidthPrevieOn ? "w-full" : "w-1/2 sm:hidden"
        } h-auto`}
      >
        <div
          className={`h-[42px] bg-custom-white-200 dark:bg-custom-dark-300 flex items-center justify-between px-5 fixed top-[72px] ${
            isFullWidthPrevieOn ? "w-full" : "w-1/2"
          }`}
        >
          <span className="text-custom-text-heading-sm uppercase tracking-[2px] text-custom-grey-300  dark:text-custom-grey-200 duration-300 ease-in-out">
            Preview
          </span>
        </div>
        <div className="w-full h-full p-5 overflow-y-auto md-rendered dark:bg-custom-dark-400 dark:text-custom-grey-200">
          <div
            className={`${
              isFullWidthPrevieOn ? "w-1/2 lg:w-11/12 mx-auto" : "w-full"
            } h-auto`}
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      </div>

      {!props.isSidebarOpen && (
        <Button
          className="fixed right-7 top-[86px]"
          onClick={() => setIsFullWidthPrevieOn(!isFullWidthPrevieOn)}
          mode="transparent"
          icon={isFullWidthPrevieOn ? "hide" : "show"}
          aria-label="Hide Editor"
        ></Button>
      )}
    </div>
  );
};

export default Editor;
