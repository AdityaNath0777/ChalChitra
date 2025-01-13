import { useCallback, useState } from "react";
import { debounce } from "@shared/utils/debounce";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    debounce((value: string) => {
      console.log("Searching for ", value);

      // api logic 
    }, 300),
    []
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value.length < 200) {
      setQuery(e.target.value);
      handleSearch(e.target.value);
    }
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Searching...");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-3 w-full">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
        aria-placeholder="Search"
        className="grow text-slate-300 px-2 sm:px-3 lg:px-4 py-1 lg:py-2 text-sm bg-slate-900 outline-none rounded-l-full border-2 border-slate-400 focus:border-slate-200"
      />
      <div>
        <SearchButton type="submit" />
      </div>
    </form>
  );
};

export default SearchBar;
