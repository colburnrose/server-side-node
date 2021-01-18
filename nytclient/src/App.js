import React, { Component } from "react";
import Book from "./Book";
import "./App.css";

class App extends Component {
  state = {
    books: [],
    search: "",
    sort: "",
    error: null,
  };
  // methods to update state
  setSearch(search) {
    this.setState({
      search,
    });
  }

  setSort(sort) {
    this.setState({
      sort,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // construct a URL with the query string
    const URL = "http://localhost:8000/books";
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join("&");
    const url = `${URL}?${query}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          books: data,
          error: null, // reset errors
        });
      })
      .catch((error) => {
        this.setState({
          error: "Sorry could not retrieve any books at this time.",
        });
      });
  }

  render() {
    // map over all the books
    const books = this.state.books.map((book, i) => {
      return <Book key={i} {...book} />;
    });
    return (
      <main className="App">
        <h1>NYT Best Sellers</h1>
        <div className="search">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={(e) => this.setSearch(e.target.value)}
            />
            <label htmlFor="sort">Sort:</label>
            <select
              id="sort"
              name="sort"
              onChange={(e) => this.setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="rank">Rank</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <ul>{books}</ul>
          <div className="App_error">{this.state.error}</div>
        </div>
      </main>
    );
  }
}

export default App;
