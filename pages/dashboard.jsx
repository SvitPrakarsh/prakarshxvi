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
import { cloneElement } from 'react';

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
	checkout: {
		backgroundColor: theme.palette.background.paper,
		color: '#fff',
	},
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
		<Container maxWidth="md">
			<Grid
				container
				justify="space-between"
				alignItems="center"
				style={{ padding: 10 }}
			>
				<Typography
					variant="h4"
					style={{
						fontFamily: "'Valorant',sans-serif",
						fontWeight: 400
					}}
				>
					Dashboard
				</Typography>
				<Button variant="contained" className={classes.checkout} size="large">
					Checkout
				</Button>
			</Grid>
			<Divider />
			<List>
				{generate(
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<FolderIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Single-line item"
							secondary="Secondary text"
						/>
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				)}
			</List>
		</Container>
	);
}
