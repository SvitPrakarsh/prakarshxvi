import {Avatar, Container, makeStyles} from '@material-ui/core';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { useContext, useEffect, useState } from 'react';
import Context from '../Context';
import { List } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ListItemText } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { HomeOutlined } from '@material-ui/icons';
import { getSession, signIn, signOut, providers } from "next-auth/client";
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_API_URL

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
		alignSelf: 'center',
	},
	list: {
		width: 300,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: 240,
		flexShrink: 0,
	},
}));


const Navigation = ({ props }) => {
	const classes = useStyles();
	const [scrolled, setScrolled] = useState(0);
	const { drawer, setDrawer, auth, setAuth, session, setSession, user, setUser } = useContext(Context);

	useEffect(() => {
		getSession().then((s) => {
			setSession(s);
			if (s) {
				axios({
					method: 'post',
					url: `${baseUrl}/participants`,
					data: {
						'email': s.user.email
					},
					headers: {
						'Authorization': "Bearer " + s.jwt
					}
				}).then((u) => {
					if (u.data.length > 0) {
						setUser(u.data);
					}
					else {
						setAuth(true);
					}
				}).catch((e)=>{
					console.log(e);
				});
			}
		});
	}, []);


	console.log("*********************");
	console.log(user)
	return (
		<AppBar
			position="sticky"
			color='black'
			style={{ boxShadow: 'none' }}
			className={classes.appBar}
		>
			{/*<nav>*/}
			<Container maxWidth={'xl'}>
				<Toolbar
					style={{
						minHeight: '54px',
					}}
				>
					<Drawer />
					{/*<Typography
						className={classes.title}
						style={{}}
					>
						
					</Typography>*/}

					<div 							style={{flexGrow:1}}
					>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							// onClick={() => setDrawer(!drawer)}
							color="inherit"
						>
						<img src="/prakarsh2021-logo.png" alt="" style={{height:36, width:36,  }}/>
						</IconButton>
						</div>
					<div id="desktop-nav">
						<Button>Home</Button>
						<Button>Events</Button>
						<Button>Team</Button>
					</div>
					{user ? (
						<>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={() => setDrawer(!drawer)}
								color="inherit"
							>
								<Avatar alt="Remy Sharp" src={``} style={{width:'25px', height:'25px'}} />
							</IconButton>
							<Menu
								id="menu-appbar"
								// anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
							// open={drawer}
							// onClose={() => setDrawer(false)}
							>
								<MenuItem>Profile</MenuItem>
								<MenuItem>My account</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<Button
								variant="contained"
								size="large"
								color="secondary"
								onClick={(e) => {
									e.preventDefault();
									if (session) {
										setAuth(true)
									}
									else {
										signIn('google');
									}
								}}
							>
								Login
							</Button>
						</>
					)}
				</Toolbar>
			</Container>
			{/*</nav>*/}
		</AppBar>
	);
}

const Drawer = () => {
	const classes = useStyles();
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
				<List style={{ width: 200 }}>
					<ListItem button>
						<ListItemIcon>
							<HomeOutlined />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<HomeOutlined />
						</ListItemIcon>
						<ListItemText primary="Events" />
					</ListItem>
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
		</div>
	);
};

export default Navigation;