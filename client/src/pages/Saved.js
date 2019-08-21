import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid/";
import { List } from "../components/List";
import Card from "../components/Card/";

const styles = {
    h1: {
        fontFamily: "'Saira Stencil One', cursive"
    },
};

class Books extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        API.getBooks()
            .then(res =>
                this.setState({
                    books: res.data
                })
            )
    };


    deleteBook = book => {


        API.deleteBook(book._id)
            .then(() => {

                API.getBooks()
                    .then(res =>
                        this.setState({
                            books: res.data
                        })
                    )
            })
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API.saveBook({
                title: this.state.title,
                author: this.state.author,
                synopsis: this.state.synopsis
            })
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12 sm-12">
                        <h1 style={styles.h1} className="text-center pt-5 pb-5 text-light">SAVED BOOKS</h1>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <Card
                                        key={book._id}
                                        title={book.title}
                                        link={book.link}
                                        authors={book.authors}
                                        description={book.description}
                                        image={book.image}
                                        Button={() => (<button onClick={() => this.deleteBook(book)}
                                            className="btn btn-danger ml-2 pr-4 pl-4">Delete From List</button>)} />))}
                            </List>) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Books;