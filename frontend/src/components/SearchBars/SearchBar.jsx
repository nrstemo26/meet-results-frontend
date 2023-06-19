

const SearchBar = ({ onSearch }) => {
    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        onSearch(searchQuery);
    };
    
      return (
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Start typing an athlete's name."
            className="m-2 p-2 w-80 text-center border-2 border-primary-500"
          />
        
      );
}

export default SearchBar;
