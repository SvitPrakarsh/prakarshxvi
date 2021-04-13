import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#0593ea",
    width: "100%",
  },
}));

export default function InfoSnackbar() {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        // ContentProps={{
        //   classes: {
        //     root: classes.root,
        //   },
        // }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Certificates will be sent to you by email in 5-6 business days."
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="secondary"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
