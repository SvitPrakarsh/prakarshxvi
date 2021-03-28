import {makeStyles} from '@material-ui/core';
import {useRef, useEffect} from 'react';
import { animated, useSpring, config} from 'react-spring';
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
	const router = useRouter();
	const container = useRef(null)
	const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}));

	const calc = (x, y) => {
		const height = container.current.offsetHeight
		const width = container.current.offsetWidth
		const animX =(x-(width/2))/20
		const animY = -(y-(height/2))/20
		console.log([animY, animX, 1])
		return [animY, animX, 1]
	}
	const trans = (x, y, s) => `perspective(300px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

	return (

		<animated.div
			ref={container}
			onMouseMove={(e) => (set({xys: calc(e.nativeEvent.offsetX
, e.nativeEvent.offsetY)}))}
			// onMouseEnter={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
			onMouseLeave={() => set({xys:[0,0,1]})}
			id="event-card"
			style={{
				transform: props.xys.to(trans),
				background: `hsla(${color}, 72%, 64%, 1) url(${category.textUrl}) no-repeat 98%`
			}}
			onClick={() => {
				console.log(encodeURI(category.name));
				router.push(`/events/${encodeURI(category.name)}`);
			}}
		>
			<img
				id="card-icon" src={category.iconUrl} alt=""/>
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
