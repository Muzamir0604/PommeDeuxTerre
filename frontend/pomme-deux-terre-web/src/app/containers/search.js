import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import CardCarousel from "../components/post-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getPostSearch } from "../actions/searchActions";

//FIXME: Search for nothing gives nothing, currently giving everything

function Search(props) {
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
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default Search;
