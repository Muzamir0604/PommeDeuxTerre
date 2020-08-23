import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, Typography, BottomNavigation } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const useStyles = makeStyles((theme) => ({
  containerFluid: {
    backgroundImage: `linear-gradient(90deg,#016450,#02818A, #3690C0)`,
    color: "#eaeceb",
    paddingTop: "2em",
    paddingBottom: "1em",
    textAlign: "center",
  },
  locationContainer: {
    backgroundColor: "#b0a19b",
    color: "#eaeceb",
    textAlign: "center",
  },
  trademark: {
    borderTop: "1px solid grey",
    paddingBottom: "0em",
    marginBottom: "0em",
    paddingTop: "1em",
  },
  socialIcons: {
    color: "#F5F5F5",
    margin: "0.5em",
  },
  socialTitle: {
    marginBottom: "0.5em",
  },
  paragraph: {
    marginBottom: "0.1em",
    paddingTop: "1em",
  },
}));

const PageFooter = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={`${classes.containerFluid}`}>
        <Grid item xs={12} sm={4} className="">
          <Typography variant="h6">Our Locations</Typography>
          <p className={classes.paragraph}>France, Paris</p>
          <p className={classes.paragraph}>+33 0648216339</p>
          <p className={classes.paragraph}>admin@Apple2Earth.com</p>
          <p className={classes.paragraph}>11 Rue Maurice</p>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className={classes.socialTitle}>
            Follow Us
          </Typography>
          <Link href="https://instagram.com" className={classes.socialIcons}>
            <InstagramIcon />
          </Link>
          <Link href="https://facebook.com" className={classes.socialIcons}>
            <FacebookIcon />
          </Link>
          <Link href="https://linkedin.com" className={classes.socialIcons}>
            <LinkedInIcon />
          </Link>
        </Grid>

        <Divider />
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Resources</Typography>
          <p className={classes.paragraph}>Blog</p>
          <p className={classes.paragraph}>User Stories</p>
          <p className={classes.paragraph}>News</p>
        </Grid>

        <Grid item xs={12} className={classes.trademark}>
          <h5>&copy; Apple2Earth</h5>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PageFooter;
