

const SearchBar = ({ onSearch }) => {
    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        onSearch(searchQuery);
    };
    
      return (
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search by name"
          className="search-bar"
        />
      );
}

export default SearchBar;
