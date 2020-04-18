import React from "react";
import { withCookies } from "react-cookie";
import { Navbar, Nav, NavDropdown, Col, Row, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { releaseUser } from "../../actions/userActions";
import "../../styles/globals/navbar.css";

// https://www.w3schools.com/bootstrap/bootstrap_ref_comp_navs.asp
//TODO: Add css file

function NavBarHead(props) {
  const dispatch = useDispatch();

  const CatshortList = useSelector((state) => state.categoryReducer.shortList);

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("token");
    props.cookies.remove("userId");
  };

  return (
    <React.Fragment>
      {CatshortList ? (
        <Row>
          <Col sm={2} className="side"></Col>

          <Col sm={8} className="main">
            <Navbar
              collapseOnSelect
              expand="lg"
              variant="light"
              style={{ padding: "0px 0px" }}
            >
              <Image
                className="navbar-icon"
                src={require("../../../assets/Apple.ico")}
                rounded
              />
              <Navbar.Brand>
                <Link className="nav-link" to={"/"} replace>
                  Pomme Deux Terre
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Link className="nav-link" to={"/"} replace>
                    Home
                  </Link>
                  <Nav>
                    <Link className="nav-link" to={"/aboutus"} replace>
                      About Us
                    </Link>
                  </Nav>
                  <NavDropdown title="Category" id="collasible-nav-dropdown">
                    {CatshortList.map((category) => {
                      return (
                        <Link
                          key={category.id}
                          className="dropdown-item"
                          to={"/category?category=" + category.id}
                        >
                          {category.title}
                        </Link>
                      );
                    })}
                  </NavDropdown>
                </Nav>
                <Nav style={{ alignItems: "center" }}>
                  {props.cookies.get("userId") ? (
                    <React.Fragment>
                      <Navbar className="solo-nav">
                        <Link
                          className="nav-link"
                          to={"/user/" + props.cookies.get("userId")}
                        >
                          Profile
                        </Link>
                      </Navbar>
                      <Navbar className="solo-nav">
                        <Link
                          className="nav-link"
                          onClick={releaseUserDispatch}
                          to={"/login"}
                          replace
                        >
                          Logout
                        </Link>
                      </Navbar>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Navbar>
                        <Link
                          className="nav-link"
                          to={"/login/?signup=true"}
                          replace
                        >
                          Signup
                        </Link>
                      </Navbar>
                      <Navbar>
                        <Link className="nav-link" to={"/login"} replace>
                          LogIn
                        </Link>
                      </Navbar>
                    </React.Fragment>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

          <Col sm={2} className="side"></Col>
        </Row>
      ) : null}
    </React.Fragment>
  );
}

export default withCookies(NavBarHead);
