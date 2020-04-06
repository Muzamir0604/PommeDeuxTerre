import React from "react";
import { withCookies } from "react-cookie";
import CardCarousel from "../components/post-carousel";
import { Link } from "react-router-dom";

function Overview(props) {
  const authorized = (
    <React.Fragment>
      <div>
        {/* {console.log(props.shortList)} */}
        {props.shortList.map((category) => {
          // console.log(category.title);
          let CatList = (
            <React.Fragment>
              <h3>
                <Link
                  className=".nav-link"
                  style={{ color: "black" }}
                  to={"/category/?category=" + category.id}
                >
                  {category.title}
                </Link>
              </h3>
              <CardCarousel posts={category.category_posts} />
            </React.Fragment>
          );
          return <React.Fragment key={category.id}>{CatList}</React.Fragment>;
        })}
      </div>
    </React.Fragment>
  );
  const notAuthorized = <div>Not authorized</div>;
  let renderComponent;
  if (props.cookies.get("mr-token")) {
    renderComponent = authorized;
  } else {
    renderComponent = notAuthorized;
  }

  return <React.Fragment>{renderComponent}</React.Fragment>;
}

export default withCookies(Overview);
