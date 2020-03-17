import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withCookies } from 'react-cookie'

class ImageItem extends Component {

    render() {
        return (
            <React.Fragment>
                <img
                    className="d-block w-100"
                    src={this.props.image}
                    alt=""
                />
            </React.Fragment>

        );
    }
}


export default withCookies(ImageItem);