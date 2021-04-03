import "@fontsource/rubik";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import "swiper/swiper.scss";
import { theme } from "../helpers/theme";
import "../styles/global.scss";
import { Provider } from "../Context";
import Axios from "axios";
import "swiper/components/pagination/pagination.scss";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../helpers/Layout";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => NProgress.done();

Axios.defaults.baseURL = "https://prakarshxvi-api.herokuapp.com";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
