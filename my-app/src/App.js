import React, { Component } from "react";

class App extends Component {
  state = {
    term: "",
    location: "",
    results: []
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  makeCall = (term, location) => {
    fetch("/", {
      method: "POST",
      params: { term: term, location: location }
    });
  };

  handleSubmit = () => {
    const { term, location } = this.state;
    this.makeCall(term, location);
    this.setState({ term: "", location: "" });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <label htmlFor="">term</label>
        <input
          type="text"
          name="term"
          value={this.state.term}
          onChange={e => this.handleInput(e)}
        />
        <br />
        <label htmlFor="">location</label>
        <input
          type="text"
          name="location"
          value={this.state.location}
          onChange={e => this.handleInput(e)}
        />
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }
}

export default App;
