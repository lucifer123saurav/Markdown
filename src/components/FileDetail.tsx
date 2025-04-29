import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
interface FileDetailProps {
  title: string;
  text: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const FileDetail = (props: FileDetailProps) => {

  return (
    <div className="flex items-center">
      <img src="/icons/icon-document.svg" alt="File name" />
      <div className="ml-5">
        <span className="text-custom-grey-300 font-extralight text-custom-text-body leading-none sm:hidden">
          {props.text}
        </span>
          <input
            type="text"
            className="block w-80 sm:w-24 bg-custom-dark-200 border-b border-b-custom-dark-200 text-custom-white-100 caret-custom-orange-400 hover:border-solid hover:border-b hover:border-b-custom-white-100 focus:border-b focus:border-b-custom-white-100 focus:outline-0"
            value={props.title}
            onChange={(e) => props.onChange(e.target.value)}
          />
      </div>
    </div>
  );
};

export default FileDetail;
