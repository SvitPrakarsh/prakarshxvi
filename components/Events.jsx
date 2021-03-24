import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion"
import {useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container, Divider,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 180,
    },
});
export default function EventCategories() {
    const classes = useStyles();

    const items = [
        {
            id: 1,
            title: 'Dexters Lab',
            subtitle: 'lorem ipsum'
        },
        {
            id: 2,
            title: 'Dexters Lab',
            subtitle: 'lorem ipsum'
        },
        {
            id: 3,
            title: 'Dexters Lab',
            subtitle: 'lorem ipsum'
        },
        {
            id: 4,
            title: 'Dexters Lab',
            subtitle: 'lorem ipsum'
        }
    ]

    return (
        <Container style={{padding: '30px 20px'}}>
            <div style={{maxWidth:'36vw', margin: '0 auto 50px'}}>
                <Typography variant='h3' align='center' gutterBottom style={{fontFamily:'"Valorant",sans-serif'}}>Events</Typography>
                <Divider />
            </div>
            <Grid container spacing={2} alignItems='spaceAround'>
                {items.map((item,key) => {
                    return (<Grid item sm md={6} lg={3} key={key}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/prakarsh2021-logo.png"
                                    title=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.subtitle}
                                        {item.subtitle}
                                        {item.subtitle}
                                        {item.subtitle}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>)
                })
                }
            </Grid>
        </Container>
    )
}

const Animation = () => {
    const [selectedId, setSelectedId] = useState(null)

    const items = [
        {
            id: 1,
            title: 'Dexters Lab',
            subtitle: 'lorem ipsum'
        }
    ]
    return (
        <AnimateSharedLayout type="crossfade">
            {items.map(item => (
                <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
                    <motion.h5>{item.subtitle}</motion.h5>
                    <motion.h2>{item.title}</motion.h2>
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <motion.div layoutId={selectedId}>
                        <motion.h5>{items[selectedId].subtitle}</motion.h5>
                        <motion.h2>{items[selectedId].title}</motion.h2>
                        <motion.button onClick={() => setSelectedId(null)}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    )
}