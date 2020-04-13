import React from "react";
import { withCookies } from "react-cookie";
import CardCarousel from "../components/post-carousel";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

//FIXME: Redesign the layout to make it mobile friendly
function Overview(props) {
  const authorized = (
    <React.Fragment>
      <Container>
        {props.shortList.map((category) => {
          let CatList = (
            <React.Fragment>
              <Container>
                <h3 style={{ paddingTop: "10px" }}>
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
          return <React.Fragment key={category.id}>{CatList}</React.Fragment>;
        })}
      </Container>
    </React.Fragment>
  );
  const notAuthorized = <div>Not authorized</div>;
  let renderComponent;
  if (props.cookies.get("token")) {
    renderComponent = authorized;
  } else {
    renderComponent = notAuthorized;
  }

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Overview);
