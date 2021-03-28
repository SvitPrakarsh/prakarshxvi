import Context from "../Context";
import { useContext } from "react";
import { Snackbar, Slide, SnackbarContent } from "@material-ui/core";

export default function ErrorSnackbar() {
  const { error, setError } = useContext(Context);
  return (
    <Snackbar
      id="snackbar"
      disableWindowBlurListener
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={error}
      TransitionComponent={Slide}
      //   message={error}
      onClose={() => {
        setError(null);
      }}
    >
      <SnackbarContent style={{
      backgroundColor:'red',
    }}
    message={<span id="snackbar-text">{error}</span>}
  />
    </Snackbar>
  );
}
