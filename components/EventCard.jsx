import {Card, makeStyles} from '@material-ui/core';
import {useRef, useEffect} from 'react';
import {animated} from '@react-spring/web';
import {use3dEffect} from '../Animations/useThreeD';
import {useRouter} from "next/router";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	actionArea: {
		width: 'fit-content',
	},
});


export default function EventCard({category, color}) {
	const container = useRef(null);
	const classes = useStyles();
	const router = useRouter();
	console.log(color)
	// const { style, ...mouseHandlers } = use3dEffect(container);

	return (
		<div
			// ref={container}
			id="event-card"
			onClick={() => {
				console.log(encodeURI(category.name));
				router.push(`/events/${encodeURI(category.name)}`);
			}}
			style={{background: `hsla(${color}, 72%, 64%, 1) url(${category.textUrl}) no-repeat 98%`}}
		>
			<img id="card-icon" src={category.iconUrl} alt=""/>
			{/* <div
										id="card-text"
									/> */}
		</div>
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
