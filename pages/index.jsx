import {Container, Grid, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import Image from "next/image"

const useStyles = makeStyles((theme) => ({
	heroDesc:{
		fontFamily: 'Rubik',
		fontSize: 18,

	}
}));

export default function Home() {
	const classes = useStyles();

	return (<Container maxWidth={"xl"}>
			<div id='hero'>

				<Typography
					id='hero-main'
					variant='h1'
					className={classes.heroMain}
				>
					PRAKARSH XVI
				</Typography>

				<Typography
					component='div'
					variant='caption'
					className={classes.heroDesc}
				>
	An Impulse to Soar.
				</Typography>
			</div>

	</Container>);
}
