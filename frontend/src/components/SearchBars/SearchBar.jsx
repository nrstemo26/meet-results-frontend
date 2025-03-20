import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, placeholderText }) => {
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    onSearch(searchQuery);
    };
    
    return (
      <input
      type="text"
      onChange={handleSearch}
          placeholder={placeholderText}
          className="search-bar text-sm sm:text-base"
          />
          );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export default SearchBar;
