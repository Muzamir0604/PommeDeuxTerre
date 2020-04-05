import React from "react";
import { withCookies } from "react-cookie";
import { Navbar, Nav, NavDropdown, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { releaseUser } from "../../actions/userActions";

// import { Link } from "react-router";
//  <li><Link to={"/home"} activeStyle={{color:""red}}>Home</Link></li>
// <li><Link to={"/user" + 2} activeClassName={"active"}>User</Link></li>

// putting link in Button
// onNavigateHome(){
//   browserHistory.push("/home")
// }
// <button onClick={this,onNavigateHome}>Go home </button>

function NavBarHead(props) {
  const dispatch = useDispatch();

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("mr-token");
    props.cookies.remove("user-id");
  };

  return (
    <Row>
      <Col sm={2} style={{ backgroundColor: "#343a40" }}></Col>

      <Col sm={8} style={{ padding: "0em" }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link className="nav-link" to={"/posts"} replace>
              Pomme Deux Terre
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to={"/posts"} replace>
                Home
              </Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {props.cookies.get("user-id") ? (
                <React.Fragment>
                  <Navbar>
                    <Link
                      className="nav-link"
                      to={"/user/" + props.cookies.get("user-id")}
                    >
                      Profile
                    </Link>
                  </Navbar>
                  <Navbar>
                    <Link
                      className="nav-link"
                      onClick={releaseUserDispatch}
                      to={"/"}
                      replace
                    >
                      Logout
                    </Link>
                  </Navbar>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Navbar>
                    <Link className="nav-link" to={"/?signup=true"} replace>
                      Signup
                    </Link>
                  </Navbar>
                  <Navbar>
                    <Link className="nav-link" to={"/"} replace>
                      LogIn
                    </Link>
                  </Navbar>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>

      <Col sm={2} style={{ backgroundColor: "#343a40" }}></Col>
    </Row>
  );
}

export default withCookies(NavBarHead);
