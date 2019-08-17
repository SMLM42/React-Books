import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import SearchForm from "../components/SearchForm";
import Card from "../components/Card";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    search: "",
  };

  searchBooks = () => {
    API.searchBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBook(this.state.search_term)
      .then(res => {
        if (!res.data.items) {
          alert("No Results")
        } else {
          this.setState({ books: res.data.items });
          this.setState({ search_term: "" });
        }
      })
  };

  handleBookSave = (book) => {
    let auths = book.volumeInfo.authors
    let authors = book.volumeInfo.authors[0];
    for (let index = 1; index < auths.length; index++) {
      authors += ":" + auths[index];
    }

    authors = `${authors.split(":").join(", ")}.`

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      link: book.volumeInfo.infoLink,
      authors: authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    })
      .then(res => {
        alert(`"${book.volumeInfo.title}" added to list.`)
        this.setState({ books: this.state.books.filter(book => book.id !== res.data.id) })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Col size="md-12">
          <Jumbotron>
            <h1>What Books Should I Read?</h1>
          </Jumbotron>
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Col>
        <Col size="md-12">
          <Jumbotron>
            <h1>Results</h1>
          </Jumbotron>
          {this.state.books.map(book => (
            <Card
              key={book.id}
              title={book.volumeInfo.title}
              link={book.volumeInfo.infoLink}
              authors={`${book.volumeInfo.authors}.`}
              description={book.volumeInfo.description}
              image={book.volumeInfo.imageLinks.thumbnail}
              Button={() => (<button onClick={() => this.handleBookSave(book)}
                className="btn btn-success ml-2 pr-4 pl-4">Save</button>)} />))}
          {/* ) : (
              <h3>No Results to Display</h3>
          )} */}
        </Col>

      </Container>
    );
  }
}

export default Search;
