import Context from "../Context";
import { useContext } from "react";
import {
  Button,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const dashify = (str) => {
  if (str) {
    let dashedString = str.toLowerCase();
    dashedString = dashedString.replace(/ /g, '-');
    dashedString = dashedString.replace(/'/g, '');
    return dashedString;
  }
  // console.log(dashedString);
};

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "85vw",
    },
  },
}));

export default function EventDialog() {
  const classes = useStyles();
  const { cart, setCart, event, setEvent } = useContext(Context);
  // const { eventName } = event;

  return (
    <>
      <Dialog
        open={!!event}
        onClose={() => {
          setEvent(null);
        }}
        scroll="paper"
        maxWidth="xs"
        aria-labelledby={`scroll-dialog-${event?.name}`}
        aria-describedby={`scroll-dialog-${event?.category}`}
        classes={{
          paper: classes.dialogPaper,
        }}
      >
        <DialogTitle style={{textAlign: "center", padding: '16px 24px 5px'}}>
          {event?.eventName}
        </DialogTitle>
        <DialogActions>
          <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{padding: 10}}
          >
            {/*<Typography variant="h5">*/}
            {/*	*/}
            {/*</Typography>*/}
            <div>
              <Chip
                  color="primary"
                  label={`₹ ${event?.details[2].sectionContent}`}
              />
              <Chip label={`${event?.details[3].sectionContent}`} variant="outlined"
                    style={{float: 'right', marginLeft: '10px'}}/>
            </div>

            <Button
                size="large"
                variant="outlined"
                onClick={() => setCart(event)}
                color="primary"
            >
              Participate
            </Button>
          </Grid>
        </DialogActions>
        <DialogContent>
          <CardMedia
              image={`/images/${dashify(event?.category_name)}/${dashify(event?.eventName)}.png`}
              title=""
              style={{height: 250, paddingTop: 0, borderRadius: '15px'}}
          />
          <br/>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Typography variant="body1">

            </Typography>


            {event?.details.map((detail, key) => {
              if (key !== 2 && key !== 3)
                return (
                    <div key={key}>
                      <Typography variant="h5" color='primary' gutterBottom>{detail.sectionHeader}</Typography>
                      {key !== 4 ? (
                          <Typography gutterBottom variant="body1" style={{textAlign: 'justify'}}>
                            {detail.sectionContent}
                          </Typography>
                      ) : (
                          detail.sectionContent.map((round, subKey) => (
                              <>
                                <Typography variant="h6" color='secondary'>
                                  {round.sectionHeader}
                                </Typography>
                                <Typography variant="body1" style={{textAlign: 'justify'}}>
                                  {round.sectionContent.toString()}
                                </Typography>
                              </>
                          ))
                      )}
                    </div>
                );
              return null;
            })}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
