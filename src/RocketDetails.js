import React, { Component } from 'react';

class RocketDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rocket: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`https://api.spacexdata.com/v3/rockets/${id}`)
      .then(response => response.json())
      .then(rocket => this.setState({ rocket: rocket }));
  }

  render() {
    const { rocket } = this.state;

    if (!rocket) {
      return <div>Loading...</div>;
    }

    return (
      <div className="rocket-details">
        <h3>{rocket.rocket_name}</h3>
        <p>Height: {rocket.height.meters} meters</p>
        <p>Weight: {rocket.mass.kg} kg</p>
        <p>First Flight: {rocket.first_flight}</p>
      </div>
    );
  }
}

export default RocketDetails;
