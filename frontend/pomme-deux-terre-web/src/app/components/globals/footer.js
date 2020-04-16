import React, { Component } from "react";

import "../../styles/globals/footer.css";

class PageFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <div className="container-fluid padding">
            {/* <div className="row text-center">
              <div className="col-md-4">
                <img className="bug-icon img-fluid" src="#"alt=""/>
                <h5>Contact</h5>
                <p>555-555-5555</p>
                <p>email@ymail.com</p>
                <p>street name</p>
                <p>City state</p>
              </div>
              <div className="col-md-4">
                <h5>Our hours</h5>
                <p>Monday: 9am to 5pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday : closed</p>
              </div>
              <div className="col-md-4">
                <h5>Service Areas</h5>
                <p>City state</p>
                <p>City state</p>
                <p>City state</p>
                <p>City state</p>
              </div>
            </div> */}
            <div className="col-12">
              <h5>&copy; PommeDeuxTerre.com</h5>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default PageFooter;
