import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
    };
    
    return (
      <input
      type="text"
      onChange={handleSearch}
          placeholder="Start typing an athlete's name..."
          className="search-bar"
          />
          );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export default SearchBar;
