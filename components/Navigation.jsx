import {
	Avatar,
	Container,
	makeStyles,
	CircularProgress,
	CardMedia,
} from '@material-ui/core';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { useContext, useEffect, useState, useRef } from 'react';
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
import { Event, Group, HomeOutlined } from '@material-ui/icons';
import { getSession, signIn, signOut, providers } from 'next-auth/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';

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
		alignSelf: 'center',
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

const Navigation = ({ props }) => {
	const classes = useStyles();
	const router = useRouter();
	const [menu, setMenu] = useState(false);
	const [loading, setLoading] = useState(true);
	const [scrolled, setScrolled] = useState(false);
	const {
		setAuth,
		session,
		setSession,
		user,
		setUser,
		error,
		setError,
	} = useContext(Context);
	const anchorEl = useRef(null);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			let isTop = window.scrollY < 50;
			if (isTop !== true) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		});

		getSession().then((s) => {
			setSession(s);
			if (s) {
				axios({
					method: 'post',
					url: `${baseUrl}/participants`,
					data: {
						email: s.user.email,
					},
					headers: {
						Authorization: 'Bearer ' + s.jwt,
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
						setError('Unable to reach server!');
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				setLoading(false);
			}
			return () => {
				window.removeEventListener('scroll', window);
			};
		});
	}, []);

	return (
		<AppBar
			position="sticky"
			color={scrolled ? 'black' : 'transparent'}
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

					<div style={{ flexGrow: 1 }}>
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
					</div>
					<div id="desktop-nav">
						<Button onClick={() => router.push('/')}>Home</Button>
						<Button onClick={() => (window.location.href = '/#events')}>
							Events
						</Button>
						<Button onClick={() => router.push('/team')}>Team</Button>
					</div>
					{user ? (
						<>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={() => setError('Error my ass')}
								onClick={() => {
									setMenu(true);
								}}
								color="inherit"
							>
								<Avatar
									ref={anchorEl}
									alt=""
									src={session.user.image}
									style={{ width: '24px', height: '24px' }}
								/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl.current}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={menu}
								onClose={() => setMenu(false)}
							>
								<MenuItem
									onClick={() => {
										router.push('/dashboard');
										setMenu(false);
									}}
								>
									Dashboard
								</MenuItem>
								<MenuItem
									onClick={() => {
										signOut({ redirect: false });
										setUser(null);
										setSession(null);
										setMenu(false);
									}}
								>
									Sign Out
								</MenuItem>
							</Menu>
						</>
					) : (
						<>
							{loading ? (
								<CircularProgress size={28} />
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
												method: 'post',
												url: `${baseUrl}/participants`,
												data: {
													email: session.user.email,
												},
												headers: {
													Authorization: 'Bearer ' + session.jwt,
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
													setError('Error!!!');
												})
												.finally(() => {
													setLoading(false);
												});
										} else {
											signIn('google');
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
							router.push('/');
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
							window.location.href = '/#events';
							setDrawer(false);
						}}
					>
						<ListItemIcon>
							<Event />
						</ListItemIcon>
						<ListItemText primary="Events" />
					</ListItem>
					<ListItem button onClick={() => router.push('/team')}>
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
