import { Button } from "@shared/components";

const VoiceSearch = () => {
  return (
    <Button
      className={"p-2 rounded-full bg-slate-400  w-10 h-10"}
      type={"button"}
      aria-label={"Voice Search"}
    >
      <i className="text-gray-100 fa-solid fa-microphone"></i>
    </Button>
  );
};

export default VoiceSearch;
