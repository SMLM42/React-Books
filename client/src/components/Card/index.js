import React from "react";
// import "./style.css"

function Book(props) {
    return (

        <div className="col-10 cont mb-4 p-4 card">
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
                <a className="btn btn-primary mr-2 pr-4 pl-4" target="blank" href={props.link}>Buy</a>
                <props.Button />
            </div>
        </div>
    );
}

export default Book;