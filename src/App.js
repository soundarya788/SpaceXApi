
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      rockets: [],
      selectedRocket: null,
      searchStatus: '',
      searchLaunch: '',
      searchType: '',
      currentPage: 1,
      rocketsPerPage: 10
    };
  }

  componentDidMount() {
    this.fetchRocketData();
  }

  fetchRocketData = () => {
    fetch('https://api.spacexdata.com/v3/rockets')
      .then(response => response.json())
      .then(rockets => this.setState({ rockets: rockets }))
      .catch(error => console.log(error));
  }

  handleMoreInfo = (rocket) => {
    this.setState({ selectedRocket: rocket });
  }

  handleSearchStatus = (event) => {
    this.setState({ searchStatus: event.target.value });
  }

  handleSearchLaunch = (event) => {
    this.setState({ searchLaunch: event.target.value });
  }

  handleSearchType = (event) => {
    this.setState({ searchType: event.target.value });
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { rockets, selectedRocket, searchStatus, searchLaunch, searchType, currentPage, rocketsPerPage } = this.state;

    
    const filteredRockets = rockets.filter(rocket => {
      if (searchStatus && rocket.status !== searchStatus) return false;
      if (searchLaunch && rocket.original_launch !== searchLaunch) return false;
      if (searchType && rocket.type !== searchType) return false;
      return true;
    });

  
    const indexOfLastRocket = currentPage * rocketsPerPage;
    const indexOfFirstRocket = indexOfLastRocket - rocketsPerPage;
    const currentRockets = filteredRockets.slice(indexOfFirstRocket, indexOfLastRocket);

    
    const totalPages = Math.ceil(filteredRockets.length / rocketsPerPage);

    return (
      <div className="container">
        <div className="banner">
          
        </div>


        <div className="search-form">
          <h3>Search Rockets</h3>
          <div>
            <label>Status:</label>
            <input type="text" value={searchStatus} onChange={this.handleSearchStatus} />
          </div>
          <div>
            <label>Original Launch:</label>
            <input type="text" value={searchLaunch} onChange={this.handleSearchLaunch} />
          </div>
          <div>
            <label>Type:</label>
            <input type="text" value={searchType} onChange={this.handleSearchType} />
          </div>
        </div>

        
        <div className="data-grid">
          {currentRockets.map(rocket => (
            <div className="card" key={rocket.id}>
              <img src={rocket.flickr_images[0]} className="card-img-top" alt=".." />
              <div className="card-body">
               
                <h5 className="card-title">{rocket.rocket_name}</h5>
                <button className="btn btn-primary" onClick={() => this.handleMoreInfo(rocket)}>
                  More info
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => this.handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>

        
        {selectedRocket && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedRocket.rocket_name}</h3>
              <Carousel showThumbs={false}>
                {selectedRocket.flickr_images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Rocket ${index + 1}`} className="carousel-image" />
                  </div>
                ))}
              </Carousel>
              <p>Height: {selectedRocket.height.meters} meters</p>
              <p>Weight: {selectedRocket.mass.kg} kg</p>
              <p>First Flight: {selectedRocket.first_flight}</p>
              <p>Country: {selectedRocket.country}</p>
              <p>Cost per Launch: {selectedRocket.cost_per_launch}</p>
              
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;