import Context from "../Context";
import { useContext } from "react";
import { Snackbar, Slide, SnackbarContent } from "@material-ui/core";

export default function ErrorSnackbar() {
  const { error, setError, success, setSuccess } = useContext(Context);
  return (
    <>
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
        <SnackbarContent
          style={{
            backgroundColor: "red",
          }}
          message={<span id="snackbar-text">{error}</span>}
        />
      </Snackbar>
      <Snackbar
        id="snackbar"
        disableWindowBlurListener
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={success}
        TransitionComponent={Slide}
        //   message={error}
        onClose={() => {
          setSuccess(null);
        }}
      >
        <SnackbarContent
          style={{
            backgroundColor: "green",
          }}
          message={<span id="snackbar-text">{success}</span>}
        />
      </Snackbar>
    </>
  );
}
