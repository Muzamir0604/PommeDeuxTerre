import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Card, Button } from "react-bootstrap";
import "../styles/globals/card.css";
import TextTruncate from "react-text-truncate";
import { useHistory } from "react-router-dom";
import Tags from "../components/tag";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Divider, Grid } from "@material-ui/core";
import Star from "./review/star";
import capitalize from "../utils/textTransformer";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    marginBottom: "2em",
    boxShadow: `-webkit-box-shadow: 10px 13px 5px -10px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 13px 5px -10px rgba(0,0,0,0.75);
box-shadow: 10px 13px 5px -10px rgba(0,0,0,0.75);`,
    "&:hover, &:focus": {
      boxShadow: `-webkit-box-shadow: 10px 13px 5px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 13px 5px -2px rgba(0,0,0,0.75);
box-shadow: 10px 13px 5px -2px rgba(0,0,0,0.75);`,
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },

  star: {
    margin: theme.page.margin,
  },
}));
function CardPost(props) {
  const classes = useStyles();
  const history = useHistory();
  const [display, setDisplay] = useState(false);
  const {
    title,
    description,
    image,
    navigation,
    user,
    updated_date,
    created_date,
    tags,
    reviewStarsAvg,
    reviewCount,
  } = props.data;
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">{capitalize(user.charAt(0))}</Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={capitalize(user)}
          subheader={`Last Updated: ${updated_date.toDateString()}`}
        />
        <CardActionArea
          onClick={() => {
            history.push(navigation);
          }}
        >
          <Grid container direction="row" className={classes.star}>
            <Star value={reviewStarsAvg} />
            <Typography variant={"subtitle1"}>({reviewCount})</Typography>
          </Grid>
          {console.log("IMAGE:", image)}
          <CardMedia
            style={{ height: "250px" }}
            image={
              image === undefined
                ? require("../../assets/blog/castle.png")
                : `${image}`
            }
            title="Paella dish"
          />
        </CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`Created On: ${created_date.toDateString()}`}
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Divider />
          <Typography variant="body2" component="p">
            <br />
            {'"a benevolent smile"'}
          </Typography>
          <Typography variant="body2" component="p" style={{ color: "black" }}>
            {display ? (
              <TextTruncate
                line={3}
                element="span"
                text={description}
                textTruncateChild={
                  // eslint-disable-next-line
                  <a
                    style={{ color: "blue" }}
                    onClick={() => setDisplay(false)}
                  >
                    Collapse
                  </a>
                }
              />
            ) : (
              <TextTruncate
                line={1}
                element="span"
                text={description}
                textTruncateChild={
                  // eslint-disable-next-line
                  <a style={{ color: "blue" }} onClick={() => setDisplay(true)}>
                    Read on
                  </a>
                }
              />
            )}
          </Typography>
        </CardContent>

        <Tags tags={tags} count={5} />
      </Card>
    </React.Fragment>
  );
}

export default CardPost;
