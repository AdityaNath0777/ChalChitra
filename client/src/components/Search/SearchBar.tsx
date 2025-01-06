import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Searching...");
  };
  return (
    <form onSubmit={handleSubmit} className="flex p-3 w-full">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="grow text-slate-300 px-4 py-2 bg-slate-900 outline-none rounded-l-full border-2 border-slate-400 focus:border-slate-200"
      />
      <button
        type="submit"
        className="rounded-r-full pl-4 pr-6 py-2 bg-slate-400 text-center"
      >
        <i className="text-lg fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchBar;
