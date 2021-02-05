import React from "react";


// value={this.state.search}
// handleInputChange={this.handleInputChange}
// handleFormSubmit={this.handleFormSubmit}

function SearchForm(props) {
  return (
    <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => props.search(e)}
        />
      </form>
    </div>
  );
}

export default SearchForm;
