import {
	Avatar,
	Button,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {cloneElement} from 'react';
import {Info} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		margin: theme.spacing(4, 0, 2),
	},
	// checkout: {
	// 	backgroundColor: theme.palette.background.paper,
	// 	color: '#fff',
	// },
}));

function generate(element) {
	return [0, 1, 2].map((value) =>
		cloneElement(element, {
			key: value,
		})
	);
}

export default function Dashboard() {
	const classes = useStyles();

	return (
		<Container maxWidth="lg" id='dashboard'>
			<Typography
				variant="h3"
				align='center'
				gutterBottom
				style={{
					marginTop: 20,
					fontFamily: "'Valorant',sans-serif",
					fontWeight: 400
				}}
			>
				Dashboard
			</Typography>

			<Grid
				container
				justify="space-between"
				alignItems="center"
				spacing={4}
			>
				<Grid item xs={12} md={8}
				>
					<Grid
						container
						justify="space-between"
						alignItems="center"
						style={{padding: 10}}
					>
						<Typography variant="h5" gutterBottom>
							Cart
						</Typography>
						<Button variant="outlined" className={classes.checkout} size="large">
							Checkout&nbsp;<b>₹ 600</b>
						</Button>
					</Grid>
					<Divider/>
					<List>
						{generate(
							<ListItem>
								<ListItemAvatar>
									<Avatar src='/images/workshops.png' style={{backgroundColor: '#0593ea'}}>
										{/*<FolderIcon/>*/}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Python Workshop"
									secondary="Workshops"
								/>
								<ListItemSecondaryAction>
									<IconButton edge="start" aria-label="delete">
										<DeleteIcon/>
									</IconButton>
									<IconButton edge="start" aria-label="delete">
										<Info/>
									</IconButton>
									<span>₹ 200</span>
								</ListItemSecondaryAction>
							</ListItem>
						)}
					</List>
				</Grid>
				<Grid item xs={12} md={4}>
					<Grid
						container
						justify="space-between"
						alignItems="center"
						style={{padding: 10}}
					>
						<Typography variant="h5" gutterBottom>
							My Events
						</Typography>

					</Grid>
					<Divider/>
					<List>
						{generate(
							<ListItem>
								<ListItemAvatar>
									<Avatar src='/images/workshops.png' style={{backgroundColor: '#0593ea'}}>
										{/*<FolderIcon/>*/}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Python Workshop"
									secondary="Workshops"
								/>
								<ListItemSecondaryAction>
									<span>₹ 200</span>
									<IconButton edge="end" aria-label="delete">
										<Info/>
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						)}
					</List>
				</Grid>
			</Grid>
		</Container>
	);
}
