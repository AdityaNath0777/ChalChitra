import SearchBar from "./SearchBar";
import VoiceSearch from "./VoiceSearch";

const SearchForm = () => {
  return (
    <div className="flex w-full items-center">
      <SearchBar />
      <div className="w-10">
        <VoiceSearch />
      </div>
    </div>
  );
};

export default SearchForm;
