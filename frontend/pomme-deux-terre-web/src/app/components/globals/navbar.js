import React from "react";
import { withCookies } from "react-cookie";
import { Navbar, Nav, NavDropdown, Col, Row, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { releaseUser } from "../../actions/userActions";

// https://www.w3schools.com/bootstrap/bootstrap_ref_comp_navs.asp
// FIXME: Figure out the problem with the nested Anchor tags warnings
function NavBarHead(props) {
  const dispatch = useDispatch();

  const CatshortList = useSelector((state) => state.categoryReducer.shortList);

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("mr-token");
    props.cookies.remove("user-id");
  };

  return (
    <Row>
      <Col sm={2} style={{ backgroundColor: "#343a40" }}></Col>

      <Col sm={8} style={{ padding: "0em" }}>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          style={{ padding: "0px 0px" }}
        >
          <Image src="holder.js/171x180" rounded />
          <Navbar.Brand>
            <Link
              className="nav-link"
              style={{ color: "white" }}
              to={"/posts"}
              replace
            >
              Pomme Deux Terre
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to={"/posts"} replace>
                Home
              </Link>
              <Nav.Link href="#pricing">About Us</Nav.Link>
              <NavDropdown title="Category" id="collasible-nav-dropdown">
                {CatshortList.map((category) => {
                  return (
                    <NavDropdown.Item key={category.id}>
                      <Link
                        className="nav-link"
                        to={"/category?category=" + category.id}
                        style={{ color: "black" }}
                      >
                        {category.title}
                      </Link>
                    </NavDropdown.Item>
                  );
                })}
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
