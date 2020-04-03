import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button} from 'react-bootstrap';
import { withCookies } from 'react-cookie'

class CardPost extends Component {

    render() {
        return (
            <React.Fragment>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title style={{color:"black"}}>{this.props.post.title}</Card.Title>
                        <Card.Text style={{color:"black"}}>
                          {this.props.post.description}
                        </Card.Text>
                        <Button variant="primary">Read More</Button>
                    </Card.Body>
                </Card>
            </React.Fragment>

        );
    }
}


export default withCookies(CardPost);