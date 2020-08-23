import React, { useEffect } from "react";
import { withCookies } from "react-cookie";
import Overview from "./app/containers/overview";
import NavBarHead from "./app/components/globals/navbar";
import PageFooter from "./app/components/globals/footer";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "./app/actions/postActions";
import { fetchShortList } from "./app/actions/categoryAction";
import "./App.css";
function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShortList());
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const listing = (post) => {
    dispatch(setPost(post));
  };

  const post = useSelector((state) => state.postReducer.post);

  const CatshortList = useSelector((state) => state.categoryReducer.shortList);

  return (
    <React.Fragment>
      <NavBarHead />

      {CatshortList ? <Overview post={post} shortList={CatshortList} /> : null}

      {/* <PageFooter /> */}
    </React.Fragment>
  );
}

export default withCookies(App);
