/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="wrap">
      <div className="input-group flex-nowrap">
        <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" aria-label="Search" aria-describedby="addon-wrapping" />
        <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

SearchBar.defaultProps = {
  query: '',
  setQuery: '',
};
