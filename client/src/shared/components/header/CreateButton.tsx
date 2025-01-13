import { useLayout } from "@shared/hooks";
import Button from "../Button";

const CreateButton = () => {
  const { screenSize } = useLayout();

  return (
    <div>
      <Button
        type="button"
        className={`create-video-icon w-10 h-10 sm:w-auto sm:h-auto cursor-pointer text-center text-sm md:text-base p-2 pl-3 pr-3 rounded-full bg-slate-400`}
      >
        <div className="flex items-center justify-center gap-2">
          <i
            className={`fa-regular text-center fa-plus sm:mr-1`}
          ></i>
          {screenSize === "desktop" ? <span>Create</span> : null}
        </div>
      </Button>
    </div>
  );
};

export default CreateButton;
