import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "primary" | "transparent";
  children?: ReactNode;
  icon?: "save" | "add" | "delete" | "show" | "hide";
  w?: string;
}

const Button = (props: ButtonProps) => {
  let icon = "";
  let alt = "";

  switch (props.icon) {
    case "save":
      icon = "/icons/icon-save.svg";
      alt = "Save changes";
      break;
    case "add":
      icon = "/icons/icon-save.svg";
      alt = "Add new";
      break;
    case "delete":
      icon = "/icons/icon-delete.svg";
      alt = "Delete";
      break;
    case "show":
      icon = "/icons/icon-show-preview.svg";
      alt = "Delete";
      break;
    case "hide":
      icon = "/icons/icon-hide-preview.svg";
      alt = "Delete";
      break;
  }
  return (
    <button
      className={`${
        props.mode === "primary"
          ? "bg-custom-orange-400 hover:bg-custom-orange-300"
          : "bg-transparent"
      } ${
        props.w === "full" ? "w-full" : ""
      } text-custom-white-100 cursor-pointer text-custom-text-heading-md rounded py-3 px-4 flex items-center justify-center ease-in-out duration-300`}
      {...props}
    >
      {icon && (
        <img src={icon} alt={alt} className={props.children ? "mr-2 sm:mr-0" : ""} />
      )}
      <span className={`${icon ? "sm:hidden" : ""}`}>{props.children}</span>
    </button>
  );
};

export default Button;
