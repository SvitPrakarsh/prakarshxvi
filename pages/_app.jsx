import {useMemo} from 'react';
import '@fontsource/raleway';
import '@fontsource/rubik';
import Axios from 'axios';
import {CssBaseline, useMediaQuery} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import {theme} from '../helpers/theme';
import '../styles/global.scss';
// import Layout from '../helpers/Layout';
import {Provider} from '../Context';
import Navigation from '../components/Navigation';
import Register from '../components/Register';
import {Head} from "next/document";

const App = ({Component, pageProps}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
            <ThemeProvider theme={theme }>
                <CssBaseline/>
                {/* <Layout> */}
                <Navigation/>
                <Register/>
                <Component {...pageProps} />
                {/* </Layout> */}
            </ThemeProvider>
            {/* </ThemeProvider> */}
        </Provider>
        </>
    );
};

export default App;
