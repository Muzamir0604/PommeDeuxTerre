import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import CardCarousel from "../components/post-carousel";
import { getPostSearch } from "../actions/searchActions";
import { Link } from "react-router-dom";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

//FIXME: Search for nothing gives nothing, currently giving everything

function Overview(props) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.searchReducer);
  const searchInput = React.createRef();
  const [searchSubmit, setSearchSubmit] = useState(false);

  const onSearch = (e) => {
    dispatch(getPostSearch(searchInput.current.value));
    setSearchSubmit(true);
  };
  const keyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  useEffect(() => {
    console.log(search);
  }, [search]);

  const authorized = (
    <React.Fragment>
      <Container>
        <div className="md-form mt-0" style={{ paddingTop: "10px" }}>
          <Form.Group>
            <InputGroup className="mb-3">
              <FormControl
                ref={searchInput}
                placeholder="Search for Post, Description, User, Category, Recipe and Tags"
                aria-label="Search Bar"
                aria-describedby="basic-addon2"
                values="HELLo"
                onKeyPress={keyPress}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={onSearch}>
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
        {searchSubmit ? (
          <Container>
            <div>
              {undefined !== search.data.data && search.data.data.length ? (
                <React.Fragment>
                  <h3>Your search</h3>
                  <CardCarousel posts={search.data.data} />
                </React.Fragment>
              ) : (
                <p>No such data found</p>
              )}
            </div>
          </Container>
        ) : null}

        {undefined !== props.shortList && props.shortList.length
          ? props.shortList.map((category) => {
              let CatList = (
                <React.Fragment>
                  <Container
                    key={category.id}
                    style={{ paddingBottom: "10px" }}
                  >
                    <hr />
                    <h3 style={{ paddingTop: "5px" }}>
                      <Link
                        className=".nav-link"
                        style={{ color: "black" }}
                        to={"/category/?category=" + category.id}
                      >
                        {category.title}
                      </Link>
                    </h3>
                    <CardCarousel posts={category.category_posts} />
                  </Container>
                </React.Fragment>
              );
              return (
                <React.Fragment key={category.id}>{CatList}</React.Fragment>
              );
            })
          : null}
      </Container>
    </React.Fragment>
  );
  // const notAuthorized = <div>Not authorized</div>;
  let renderComponent;
  // if (props.cookies.get("token")) {
  renderComponent = authorized;
  // } else {
  //   renderComponent = notAuthorized;
  // }

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Overview);
