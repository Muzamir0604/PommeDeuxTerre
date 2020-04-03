import React, { Component } from "react";

import { updateUser } from "../actions/userActions";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Row, Col, Container } from "react-bootstrap";
import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import AdsColumn from "../components/globals/ads";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class userProfile extends Component {
  render() {
    let form;
    if (parseInt(this.props.match.params.id) === parseInt(this.props.user.id)) {
      form = (
        <React.Fragment>
          <Container
            style={{
              backgroundColor: "white",
              Color: "black",

              alignText: "center"
            }}
          >
            <h1>Your Profile</h1>
            <Form
              className="User-Form container"
              onSubmit={async values => {
                this.props.updateUser(this.props.user.id, values);
                await sleep(300);

                window.alert(JSON.stringify(values, 0, 2));
              }}
              initialValues={{
                username: this.props.user.username,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name,
                email: this.props.user.email
              }}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Username</label>
                    <Field
                      name="username"
                      component="input"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <Row>
                    <div>
                      <label>First Name</label>
                      <Field
                        name="first_name"
                        component="input"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label>Last Name</label>
                      <Field
                        name="last_name"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </Row>
                  <div>
                    <label>Email</label>
                    <Field
                      name="email"
                      component="input"
                      type="text"
                      placeholder="email"
                    />
                  </div>

                  <div className="buttons">
                    <Row>
                      <button
                        style={{
                          display: submitting || pristine ? "none" : "block"
                        }}
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        style={{
                          display: submitting || pristine ? "none" : "block"
                        }}
                        onClick={form.reset}
                      >
                        Reset
                      </button>
                    </Row>
                  </div>
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
              )}
            />
          </Container>
        </React.Fragment>
      );
    } else {
      form = <h1>ACCESS DENIED</h1>;
    }

    return (
      <React.Fragment>
        <NavBarHead />
        <Row>
          <AdsColumn />

          <Col sm={8}>{form}</Col>

          <AdsColumn />
        </Row>
        <PageFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, user) => {
      dispatch(updateUser(id, user));
    }
  };
};

userProfile.propTypes = {
  user: PropTypes.any
};
export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(userProfile)
);
