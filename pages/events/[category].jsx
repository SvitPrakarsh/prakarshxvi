import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Grid,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	ListSubheader,
	makeStyles,
	Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import events from '../../data/events.json';
import * as _ from 'lodash';
import Image from 'next/image';
import categories from '../../data/eventCategories.json';
import { useContext, useEffect } from 'react';
import Context from '../../Context';
import EventDialog from '../../components/EventDialog';

const useStyles = makeStyles((theme) => ({
	content: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 1000,
		height: 1000,
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	media: {
		maxWidth: 150,
		minWidth: 150,
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
}));

export default function Events({category, icon, events}) {
	const classes = useStyles();
	const {event, setEvent} = useContext(Context);

	useEffect(() => {
		console.log(event);
	}, [event]);

	return (
		<>
			<EventDialog/>
			<Container>
				<Grid
					container
					justify="space-between"
					alignItems="center"
					style={{padding: 10}}
				>
					<Typography
						variant="h3"
						style={{
							fontFamily: "'Valorant',sans-serif",
						}}
					>
						{category}
					</Typography>
					{/*<IconButton disabled>*/}
					<img id='category-icon' src={`/images/${icon}.png`} alt="" height="150px" width="auto"/>
					{/*</IconButton>*/}
				</Grid>
				<div className={classes.content}>
					<Grid container spacing={5}>
						{events.map((event, key) => (
							<Grid item sm md={6} lg={3} key={key}>
								<Card className={classes.root}>
									<CardActionArea onClick={() => setEvent(event)}>
										<CardMedia
											className={classes.media}
											image="/prakarsh2021-logo.png"
											title={event.name}
											style={{ height: 200, paddingTop: 0 }}
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												{event.name}
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
												component="p"
											>
												{event.category}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</div>
			</Container>
		</>
	);
}

export const getServerSideProps = async ({ query }) => {
	const category = query.category;
	const groups = _.groupBy(events, 'category');
	// console.log(groups)
	// console.log(category)
	const filteredArray = groups[category];
	// console.log(filteredArray)
	let icon = category.toLowerCase()

	icon = icon.replace(/ /g, '-')
	icon = icon.replace(/'/g, '')
	console.log(icon)

	if (filteredArray)
		return {
			props: {category, icon, events: filteredArray},
		};
	return {};
};
