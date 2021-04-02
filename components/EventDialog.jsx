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
  Grid, IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {dashify} from "../helpers/utils";
import {Close} from "@material-ui/icons";
import {brown} from "@material-ui/core/colors";

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
          <Grid container justify='space-between' alignItems='center'>
            <Typography id='event-title' variant='h4'>
              {event?.eventName}
            </Typography>
            <IconButton onClick={() => setEvent(null)}>
              <Close/>
            </IconButton>
          </Grid>

        </DialogTitle>
        <DialogActions>
          <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{padding: 10}}
              spacing={2}
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
                      <Typography variant="h5" color='primary'>{detail.sectionHeader}</Typography>
                      {key !== 4 ? (<>
                            <Typography gutterBottom variant="body1" style={{textAlign: 'justify'}}>
                              {detail.sectionContent}
                            </Typography>
                            <br/>
                          </>
                      ) : (
                          detail.sectionContent.map((round, subKey) => (
                              <>
                                <Typography variant="h6" color='secondary'>
                                  {round.sectionHeader}
                                </Typography>
                                <Typography variant="body1" style={{textAlign: 'justify'}}>
                                  {round.sectionContent}
                                </Typography>
                                <br/>
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
