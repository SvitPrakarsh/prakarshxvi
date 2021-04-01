import {
  Avatar,
  Container,
  makeStyles,
  CircularProgress,
  CardMedia,
  Badge,
} from "@material-ui/core";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { useContext, useEffect, useState, useRef } from "react";
import Context from "../Context";
import { List } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { ListItem } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";
import { ListItemText } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Event, Group, HomeOutlined } from "@material-ui/icons";
import { signIn, signOut } from "next-auth/client";
import axios from "axios";
import { useRouter } from "next/router";
import LocalMallIcon from "@material-ui/icons/LocalMall";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "'Valorant',sans-serif",
    fontSize: 24,
    flexGrow: 1,
    alignSelf: "center",
  },
  list: {
    width: 300,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: 0.3,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const {
    loading,
    setLoading,
    setAuth,
    session,
    setSession,
    user,
    setUser,
    setError,
    setmyEvents,
    cart,
  } = useContext(Context);
  const anchorEl = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let isTop = window.scrollY < 50;
      if (isTop !== true) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
    // getSession().then((s) => {
    // 	setSession(s);
    // 	if (s) {
    // 		// console.log(s.jwt);
    // 		axios({
    // 			method: 'post',
    // 			url: `${baseUrl}/participants`,
    // 			data: {
    // 				email: s.user.email,
    // 			},
    // 			headers: {
    // 				Authorization: 'Bearer ' + s.jwt,
    // 			},
    // 		})
    // 			.then((u) => {
    // 				if (u.data.length > 0) {
    // 					setUser(u.data[0]);
    // 				} else {
    // 					setAuth(true);
    // 				}
    // 			})
    // 			.catch((e) => {
    // 				console.log(e);
    // 				setError('Unable to reach server!');
    // 			})
    // 			.finally(() => {
    // 				setLoading(false);
    // 			});
    // 	} else {
    // 		setLoading(false);
    // 	}
    //
    // });
    return () => {
      window.removeEventListener("scroll", window);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      color={scrolled ? "black" : "transparent"}
      style={{ boxShadow: "none" }}
      className={classes.appBar}
    >
      {/*<nav>*/}
      <Container maxWidth={"xl"}>
        <Toolbar
          style={{
            minHeight: "54px",
          }}
        >
          <Drawer />
          {/*<Typography
						className={classes.title}
						style={{}}
					>

					</Typography>*/}

          <div style={{ flexGrow: 1 }}>
            <Link href="/">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={() => setDrawer(!drawer)}
                color="inherit"
              >
                <img
                  src="/prakarsh-logo.svg"
                  alt=""
                  style={{ height: 36, width: 36 }}
                />
              </IconButton>
            </Link>
          </div>
          <div id="desktop-nav">
            <Button onClick={() => router.push("/")}>Home</Button>
            <Button
              onClick={() => {
                if (router.pathname !== "/") {
                  router.push("/").then(() =>
                    setTimeout(() => {
                      window.location.href = "/#events";
                    }, 500)
                  );
                } else {
                  window.location.href = "/#events";
                }
              }}
            >
              Events
            </Button>
            <Button onClick={() => router.push("/team")}>Team</Button>
          </div>
          {user ? (
            <>
              <Link href="/dashboard">
                <IconButton color="inherit">
                  <Badge
                    badgeContent={cart ? cart.length : 0}
                    showZero
                    color="primary"
                  >
                    <LocalMallIcon style={{ width: "24px", height: "24px" }} />
                  </Badge>
                </IconButton>
              </Link>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  setMenu(true);
                }}
                color="inherit"
              >
                <Avatar
                  ref={anchorEl}
                  alt=""
                  src={session.user.image}
                  style={{ width: "26px", height: "26px" }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl.current}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menu}
                onClose={() => setMenu(false)}
              >
                <MenuItem
                  onClick={() => {
                    signOut({ redirect: false });
                    setUser(null);
                    setSession(null);
                    setMenu(false);
                    setmyEvents(null);
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    if (session) {
                      setLoading(true);
                      axios({
                        method: "post",
                        url: `${baseUrl}/participants`,
                        data: {
                          email: session.user.email,
                        },
                        headers: {
                          Authorization: "Bearer " + session.jwt,
                        },
                      })
                        .then((u) => {
                          if (u.data.length > 0) {
                            setUser(u.data[0]);
                          } else {
                            setAuth(true);
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                          setError("Error!!!");
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    } else {
                      signIn("google");
                    }
                  }}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </Container>
      {/*</nav>*/}
    </AppBar>
  );
};

const Drawer = () => {
  const classes = useStyles();
  const router = useRouter();
  const { drawer, setDrawer } = useContext(Context);
  return (
    <div id="mobile-nav">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
        className={classes.drawer}
      >
        <CardMedia
          // className={classes.media}
          image="/prakarsh-logo.svg"
          // title={event.name}
          style={{ height: 200, paddingTop: 0 }}
        />
        <List style={{ width: 200 }}>
          <Divider />
          <ListItem
            button
            onClick={() => {
              router.push("/");
              setDrawer(false);
            }}
          >
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              if (router.pathname !== "/") {
                router
                  .push("/")
                  .then(() => (window.location.href = "/#events"));
              } else {
                window.location.href = "/#events";
              }
              setDrawer(false);
            }}
          >
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button onClick={() => router.push("/team")}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default Navigation;
