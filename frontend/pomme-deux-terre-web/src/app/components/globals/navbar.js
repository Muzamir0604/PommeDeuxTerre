import React from "react";
import { withCookies } from "react-cookie";
import { Navbar, Nav, NavDropdown, Col, Row, Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { releaseUser } from "../../actions/userActions";
import "../../styles/globals/navbar.css";

// https://www.w3schools.com/bootstrap/bootstrap_ref_comp_navs.asp

function NavBarHead(props) {
  const dispatch = useDispatch();

  const CatshortList = useSelector((state) => state.categoryReducer.shortList);

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("token", { path: "/" });
    props.cookies.remove("userId", { path: "/" });
  };

  return (
    <React.Fragment>
      {CatshortList ? (
        <React.Fragment>
          <Row className="navbar-toprow">
            <Col sm={2} className="side"></Col>

            <Col className="Container">
              <Navbar className="row navbar-title">
                {" "}
                <Image
                  style={{ maxHeight: "38px" }}
                  className=""
                  src={require("../../../assets/AppleTop.ico")}
                />
                Apple Two Earth{" "}
                <p className="quotes-tag"></p>
              </Navbar>

              <Navbar
                className="row navbar-menu"
                collapseOnSelect
                expand="lg"
                variant="light"
                style={{ padding: "0px 0px" }}
              >
                <Navbar.Brand>
                  <Image
                    style={{ maxHeight: "35px" }}
                    className="image-bottom"
                    src={require("../../../assets/AppleBottom3.ico")}
                  />
                  <Link className="brand-title nav-link" to={"/"} replace>
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
                      {CatshortList.length
                        ? CatshortList.map((category) => {
                            return (
                              <Link
                                key={category.id}
                                className="dropdown-item"
                                to={"/category?category=" + category.id}
                              >
                                {category.title}
                              </Link>
                            );
                          })
                        : null}
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

            {/* </Col> */}
            <Col sm={2} className="side"></Col>
          </Row>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default withCookies(NavBarHead);
