import { useCallback, useState } from "react";
import { Button } from "@shared/components";
import { debounce } from "@shared/utils/debounce";

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
        className="grow text-slate-300 px-4 py-2 bg-slate-900 outline-none rounded-l-full border-2 border-slate-400 focus:border-slate-200"
      />
      <div>
        <Button
          type="submit"
          className={"rounded-r-full pl-4 pr-6 py-2 bg-slate-400 text-center"}
        >
          <i className="text-lg fa-solid fa-magnifying-glass"></i>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
