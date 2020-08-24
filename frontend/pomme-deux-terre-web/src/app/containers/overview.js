import React from "react";
import { withCookies } from "react-cookie";
import CardCarousel from "../components/post-carousel";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Search from "./search";
import { useSelector } from "react-redux";

function Overview() {
  const shortList = useSelector((state) => state.categoryReducer.shortList);

  const authorized = (
    <React.Fragment>
      <Box>
        <Search />
        {undefined !== shortList && shortList.length
          ? shortList.map((category) => {
              let CatList = (
                <React.Fragment>
                  <Box key={category.id} style={{ paddingBottom: "10px" }}>
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
                  </Box>
                </React.Fragment>
              );
              return (
                <React.Fragment key={category.id}>{CatList}</React.Fragment>
              );
            })
          : null}
      </Box>
    </React.Fragment>
  );

  let renderComponent;

  renderComponent = authorized;

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Overview);
