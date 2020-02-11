import React, { Component } from "react";

import spinner from "../resources/spinner.gif";

class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    tooManyRequests: false
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <div className="card">
          <h5 className="card-header"> {this.state.pokemonIndex} </h5>
          {this.state.imageLoading ? (
            <img
              src={spinner}
              style={{ width: "5em", height: "5em" }}
              className="card-img-top rounded mx-auto d-block mt-2"
            ></img>
          ) : null}
          <img
            src={this.state.imageUrl}
            className="card-img-top rounded mx-auto mt-2 pokeSprite"
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ tooManyRequests: true })}
            style={
              this.state.tooManyRequests
                ? { display: "none" }
                : this.state.imageLoading
                ? null
                : { display: "block" }
            }
          />
          {this.state.tooManyRequests ? (
            <h6 className="nx-auto">
              <span className="badge badge-danger mt-2">To Many Requests </span>
            </h6>
          ) : null}

          <div className="card-body mx-auto">
            <h6 className="card-title text-capitalize">{this.state.name}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
