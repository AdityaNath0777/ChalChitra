import SearchBar from "./SearchBar"
import VoiceSearch from "./VoiceSearch"

const SearchForm = () => {
  return (
    <div className="flex w-full items-center">
      <SearchBar />
      <VoiceSearch />
    </div>
  )
}

export default SearchForm