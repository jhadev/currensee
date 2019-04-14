import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import HomeImages from "../HomeImages.json";
import HomeCards from "../components/HomeCards";
import Navigation from "../components/Navigation";

class HomePage extends Component {
  state = {
    HomeImages,
    popoverOpen: false
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };
  render() {
    return (
      <div>
        <Navigation />
        <div>
          <Jumbotron />
          <div className="row">
            <div className="col">
              <div className="card-group">
                {this.state.HomeImages.map(image => (
                  <HomeCards
                    key={image.name}
                    image={image.image}
                    name={image.name}
                    id={image.id}
                    onClick={this.toggle}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="row" />
        </div>
      </div>
    );
  }
}

export default HomePage;
