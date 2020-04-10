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

function EditLayout(props) {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    placeholder: "Let's write an awesome story",
    holderId: "editorjs",
    loglevel: "ERROR",
    tools: {
      title: {
        class: Header,
        inlineToolbar: ["link"],
      },
      steps: {
        class: List,
        inlineToolbar: true,
        config: {
          placeholder: "Write the steps",
        },
      },
      myOwnParagraph: MyParagraph,
    },
    // initialBlock: myOwnParagraph,
    autofocus: true,
  });
  const image = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    placeholder: "Let's write an awesome story",
    holderId: "image",
    loglevel: "ERROR",
    tools: {
      image_title: {
        class: Header,
        inlineToolbar: ["link"],
      },
      ingredients: {
        class: List,
        inlineToolbar: true,
        config: {
          placeholder: "Write the steps",
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
            authorization: "Token 7dff600ec54292686617e9030a2a5fea62f9aa98",
            // ...
          },
        },
      },
      myOwnParagraph: MyParagraph,
    },
    // initialBlock: myOwnParagraph,
    autofocus: true,
  });
  editor.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
      /** Do anything you need after editor initialization */
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });
  //   editor
  //     .save()
  //     .then((outputData) => {
  //       console.log("Article data:", outputData);
  //     })
  //     .catch((error) => {
  //       console.log("saving failed", error);
  //     });

  const saveArticle = () => {
    editor.save().then((savedData) => {
      console.log(JSON.stringify(savedData, null, 4));
    });
    image.save().then((savedData) => {
      console.log(JSON.stringify(savedData, null, 4));
    });
  };
  return (
    <React.Fragment>
      <NavBarHead />
      <Row>
        <AdsColumn />
        <Col sm={8}>
          <h2>Add Post</h2>
          <div style={{ backgroundColor: "#F0FFFF" }} id="editorjs"></div>
          <div style={{ backgroundColor: "grey" }} id="image"></div>
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
