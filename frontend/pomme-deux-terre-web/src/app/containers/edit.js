import React from "react";

import NavBarHead from "../components/globals/navbar";
import PageFooter from "../components/globals/footer";
import AdsColumn from "../components/globals/ads";
import { Col, Row, Button } from "react-bootstrap";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import MyParagraph from "./my-paragraph";
import ImageTool from "@editorjs/image";
import { useSelector } from "react-redux";
import { UPLOAD_IMAGE_ONLY } from "../api/constant";
import "./edit.css";
import SimpleImage from "./simple-image";
//TODO: check if image removed, image from database also removed
//TODO: Create specific layout for writing posts
//TODO: Map posts content to specific fields

function EditLayout(props) {
  const auth = useSelector((state) => state.authReducer);
  //Editors
  const postInfo = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    placeholder: "Let's write an awesome story",
    holderId: "editorjs",
    loglevel: "ERROR",
    tools: {
      imageTest: SimpleImage,
      title: {
        class: Header,
        inlineToolbar: ["link"],
      },
      description: {
        class: MyParagraph,
        inlineToolbar: true,
        config: {
          placeholder: "Write the your description",
        },
      },
      image: {
        class: ImageTool,
        field: "image",
        config: {
          endpoints: {
            byFile: UPLOAD_IMAGE_ONLY, // Your backend file uploader endpoint
            byUrl: UPLOAD_IMAGE_ONLY, // Your endpoint that provides uploading by Url
          },
          additionalRequestHeaders: {
            authorization: "Token " + auth.token,
            // ...
          },
        },
      },
    },
    // initialBlock: myOwnParagraph,
    autofocus: true,
  });
  const recipestep = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    placeholder: "Tell us your recipe steps and attach images in order",
    holderId: "image",
    loglevel: "ERROR",
    tools: {
      steps: {
        class: List,
        inlineToolbar: true,
        config: {
          placeholder: "Write the recipe steps",
        },
      },
      image: {
        class: ImageTool,
        field: "image",
        config: {
          endpoints: {
            byFile: "http://10.10.153.8:8000/blog/image/", // Your backend file uploader endpoint
            byUrl: "http://10.10.153.8:8000/blog/image/", // Your endpoint that provides uploading by Url
          },
          additionalRequestHeaders: {
            authorization: "Token " + auth.token,
            // ...
          },
        },
      },
      myOwnParagraph: MyParagraph,
    },
    // initialBlock: myOwnParagraph,
    autofocus: true,
  });
  const ingredient = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    placeholder: "Give us your list of ingredients",
    holderId: "ingredient",
    loglevel: "ERROR",
    tools: {
      ingredient: {
        class: List,
        inlineToolbar: true,
        config: {
          placeholder: "Place your ingredients here",
        },
      },
    },
    // initialBlock: myOwnParagraph,
    autofocus: true,
  });

  //Editors Ready
  postInfo.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
      /** Do anything you need after editor initialization */
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });
  recipestep.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });
  ingredient.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });

  //SaveArticle
  const saveArticle = () => {
    postInfo
      .save()
      .then((savedData) => {
        console.log(JSON.stringify(savedData, null, 4));
      })
      .catch((error) => {
        console.log("saving failed", error);
      });
    recipestep
      .save()
      .then((savedData) => {
        console.log(JSON.stringify(savedData, null, 4));
      })
      .catch((error) => {
        console.log("saving failed", error);
      });
    ingredient
      .save()
      .then((savedData) => {
        console.log(JSON.stringify(savedData, null, 4));
      })
      .catch((error) => {
        console.log("saving failed", error);
      });
  };
  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />

        <Col sm={8}>
          <h2>Add Post</h2>
          <Row>
            <Col className="post-container" id="editorjs"></Col>
            <Col className="image-container" id="image"></Col>
            <Col className="ingredient-container" id="ingredient"></Col>
          </Row>
          <Button className="btn btn-primary" onClick={saveArticle}>
            Save
          </Button>
        </Col>

        <AdsColumn />
      </Row>
      <PageFooter />
    </React.Fragment>
  );
}

export default EditLayout;
