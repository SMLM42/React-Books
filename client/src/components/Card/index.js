import React from "react";
// import "./style.css"

function Book(props) {
    return (

        <div className="cont mb-5 p-1 card">
            <div>
                <h3 className="text-justify mb-4">{props.title} <small>by {props.authors}</small></h3>
            </div>
            <div>
                <img src={props.image} alt={props.title} />
                <div className="text_container">
                    <p className="text-justify">{props.description}</p>
                </div>
            </div>
            <div className="mt-3">
                <a className="btn mr-2 pr-4 pl-4 btn-success" target="blank" href={props.link}>Google Books</a>
                <props.Button />
            </div>
        </div>
    );
}

export default Book;