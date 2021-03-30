import "@fontsource/rubik";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "swiper/swiper.scss";
import {theme} from "../helpers/theme";
import "../styles/global.scss";
// import Layout from '../helpers/Layout';
import {Provider} from "../Context";
import Navigation from "../components/Navigation";
import Register from "../components/Register";
import {Head} from "next/document";
import Axios from "axios";
import "swiper/components/pagination/pagination.scss";
import ErrorSnackbar from "../components/ErrorSnackbar";

import Router from "next/router"
import NProgress from "nprogress"

Router.onRouteChangeStart = url => {
  console.log('change start')
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => NProgress.done()

Axios.defaults.baseURL = "https://prakarshxvi-api.herokuapp.com";

const App = ({Component, pageProps}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // const outerTheme = useMemo(
  //     () =>
  //         theme.palette.type = prefersDarkMode ? 'dark' : 'light'
  //             [prefersDarkMode]
  // );
  //  let palette = {palette: {
  //          type: prefersDarkMode?'dark':'light',
  //          primary: {
  //              main: '#0593EA',
  //          },
  //          secondary: {
  //              main: '#E81123',
  //          },
  //      }}

  return (
    <>
      <Provider>
        {/* <ThemeProvider theme={outerTheme}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Layout> */}
          <Navigation />
          <Register />

          <Component {...pageProps} />
          {/* </Layout> */}
          <ErrorSnackbar />
        </ThemeProvider>
        {/* </ThemeProvider> */}
      </Provider>
    </>
  );
};

export default App;
