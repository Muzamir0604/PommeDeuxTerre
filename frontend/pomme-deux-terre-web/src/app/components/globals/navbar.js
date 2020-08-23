import React, { useEffect } from "react";
import { withCookies, useCookies } from "react-cookie";
import { Image } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { releaseUser } from "../../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";

import {
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { setPost } from "../../actions/postActions";
import { fetchShortList } from "../../actions/categoryAction";

import SideMenu from "./sidemenu";
import "../../styles/globals/navbar.css";

// https://www.w3schools.com/bootstrap/bootstrap_ref_comp_navs.asp
//  FIXME: ANCHORORIGIN TOP RIGHT not working at the moment
const useStyles = makeStyles((theme) => ({
  categoryMenuItem: {
    "&:focus": {
      backgroundColor: theme.palette.secondary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  AppBar: {
    background: theme.nav.app.background,
    marginBottom: theme.nav.app.marginBottom,
    position: theme.nav.app.position,
    width: theme.nav.app.width,
  },

  grow: {
    position: theme.nav.div.position,
    height: theme.nav.div.height,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: "10px",
    display: theme.nav.title.display,
    paddingBottom: theme.nav.title.paddingBottom,
    fontFamily: theme.nav.title.fontType,
    [theme.breakpoints.up("sm", "md")]: {
      display: "block",
    },
  },
  img: {
    marginRight: "10px",
    display: theme.nav.title.display,
    paddingBottom: theme.nav.title.paddingBottom,
    fontFamily: theme.nav.title.fontType,
    [theme.breakpoints.up("sm", "md")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",

    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function NavBarHead(props) {
  const classes = useStyles();
  const [cookies, ,] = useCookies(["token"]);
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShortList());
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const listing = (post) => {
    dispatch(setPost(post));
  };
  const CatshortList = useSelector((state) => state.categoryReducer.shortList);

  const releaseUserDispatch = () => {
    dispatch(releaseUser());
    props.cookies.remove("token", { path: "/" });
    props.cookies.remove("userId", { path: "/" });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryAnchor, setCategoryAnchor] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setCategoryAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setCategoryAnchor(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {cookies["token"] ? (
          <>
            {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>

            <MenuItem
              onClick={() => {
                releaseUserDispatch();
                history.push("/");
              }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                history.push("/login");
                history.go(0);
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push("/login/?signup=true");
                history.go(0);
              }}
            >
              SignUp
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* {props.cookies.get("userId") ? ( */}
      {cookies["token"] ? (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            onClick={() => {
              history.push("/login");
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LockOpenIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/login/?signup=true");
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LockOpenIcon />
            </IconButton>
            <p>SignUp</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {CatshortList ? (
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <MenuItem
              className={classes.title}
              onClick={() => {
                history.push("/");
              }}
            >
              <Image
                style={{ maxHeight: "38px" }}
                className=""
                src={require("../../../assets/Apple.ico")}
              />
              <Typography
                style={{ fontFamily: "Lato" }}
                variant="h7"
                noWrap
                onClick={() => {
                  history.push("/");
                }}
              >
                Apple Two Earth
              </Typography>
            </MenuItem>
            <SideMenu categories={CatshortList} />
            <MenuItem
              className={classes.title}
              onClick={() => {
                history.push("/");
              }}
            >
              <Typography variant="h6" noWrap className={classes.title}>
                Home
              </Typography>
            </MenuItem>
            <MenuItem
              className={classes.title}
              onClick={() => {
                // navigate("/about");
                history.replace("/aboutus");
              }}
            >
              <Typography variant="h6" noWrap className={classes.title}>
                About Us
              </Typography>
            </MenuItem>

            <>
              <MenuItem className={classes.title}>
                <Typography
                  variant="h6"
                  noWrap
                  className={classes.title}
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Category
                </Typography>
              </MenuItem>
              <Menu
                className={classes.title}
                id="customized-menu"
                anchorEl={categoryAnchor}
                keepMounted
                open={Boolean(categoryAnchor)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {undefined !== CatshortList || CatshortList.length
                  ? CatshortList.map((category) => {
                      return (
                        <MenuItem
                          key={category.id}
                          onClick={() => {
                            history.push("/category?category=" + category.id);
                          }}
                          className={classes.categoryMenuItem}
                        >
                          <ListItemText primary={category.title} />
                        </MenuItem>
                      );
                    })
                  : null}
              </Menu>
            </>

            <MenuItem
              className={classes.title}
              onClick={() => {
                history.push("/");
              }}
            >
              <Typography variant="h6" noWrap className={classes.title}>
                Contact Us
              </Typography>
            </MenuItem>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      ) : null}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withCookies(NavBarHead);
