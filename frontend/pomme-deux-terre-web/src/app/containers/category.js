import React, { useEffect } from "react";
import { withCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import NavBarHead from "../components/globals/navbar";
// import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import CardPost from "../components/card";
// https://stackoverflow.com/questions/54843675/componentwillreceiveprops-componentdidupdate-for-react-hook
// Work on pagination with django
// https://www.django-rest-framework.org/api-guide/pagination/
// https://material-ui.com/components/pagination/
// FIXME: Add pagination for this page
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Category(props) {
  // const slug = props.slug;
  const dispatch = useDispatch();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    sleep(2000);
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchCategory(query.get("category")));
    sleep(2000);
    return () => {};
    // eslint-disable-next-line
  }, [query.get("category")]);

  const CategoryData = useSelector((state) => state.categoryReducer.categories);

  return (
    <React.Fragment>
      <NavBarHead />

      <Grid container spacing={2}>
        {undefined !== CategoryData && CategoryData.length
          ? CategoryData.map((post) => {
              return (
                <Grid item xs={12} sm={4} key={post.id}>
                  <CardPost
                    data={{
                      navigation: `/posts/${post.id}`,
                      title: post.title,
                      description: post.description,
                      image: post.post_images[0].image,
                      user: post.user.name,
                      updated_date: new Date(post.updated_at),
                      created_date: new Date(post.created_at),
                      tags: post.tags,
                      reviewStarsAvg: post.avg_rating,
                      reviewCount: post.no_of_reviews,
                    }}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </React.Fragment>
  );
}

export default withCookies(Category);
