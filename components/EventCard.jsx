import { Card, makeStyles } from '@material-ui/core';
import { useRef, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { use3dEffect } from '../Animations/useThreeD';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	actionArea: {
		width: 'fit-content',
	},
});

export default function EventCard({ category }) {
	const container = useRef(null);
	const classes = useStyles();
	const { style, ...mouseHandlers } = use3dEffect(container);

	return (
		<animated.div
			ref={container}
			id="event-card"
			onClick={() => {
				console.log(encodeURI(category.name));
				router.push(`/events/${encodeURI(category.name)}`);
			}}
			style={{ backgroundImage: `url(${category.textUrl})` }}
			{...mouseHandlers}
		>
			<img id="card-icon" src={category.iconUrl} alt="" />
			{/* <div
										id="card-text"
									/> */}
		</animated.div>
	);
}

// <Card className={classes.root}>
/* <CardActionArea
									className={classes.actionArea}
									onClick={() => {
										console.log(encodeURI(category.name));
										router.push(`/events/${encodeURI(category.name)}`);
									}}
								> */
/* <CardMedia
										className={classes.media}
										image="/prakarsh2021-logo.png"
										title=""
										style={{ height: 160, paddingTop: 0 }}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{category.name}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{category.subtitle}
										</Typography>
									</CardContent> */
/* </CardActionArea> */
// </Card>
