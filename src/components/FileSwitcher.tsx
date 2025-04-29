interface FileDetailProps {
  title: string;
  text: string;
  onClick?: () => void;
}

const FileSwitcher = (props: FileDetailProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex items-center cursor-pointer hover:opacity-70 transition-opacity ease-in-out duration-300"
    >
      <img src="/icons/icon-document.svg" alt="File name" />
      <div className="ml-5">
        <span className="text-custom-grey-300 font-extralight text-custom-text-body leading-none">
          {props.text}
        </span>
        <span className="text-custom-white-100 custom-text-heading-md block">
          {props.title}
        </span>
      </div>
    </div>
  );
};

export default FileSwitcher;
