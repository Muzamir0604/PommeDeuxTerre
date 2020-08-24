import React from "react";
import { withCookies } from "react-cookie";
import CardCarousel from "../components/post-carousel";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Search from "./search";

// FIXME : create material ui version, refer to coffeecard, tag, star, carousel, overview.js
function Overview(props) {
  const authorized = (
    <React.Fragment>
      <Box
        style={{
          paddingTop: "3em",
        }}
      >
        <Search />
        {undefined !== props.shortList && props.shortList.length
          ? props.shortList.map((category) => {
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
