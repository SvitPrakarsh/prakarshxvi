import Navigation from "../components/Navigation";
import Register from "../components/Register";
import ErrorSnackbar from "../components/ErrorSnackbar";
import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import Context from "../Context";
import SplashScreen from "../components/SplashScreen";
import useLocalStorage from "./useLocalStorage";

const Layout = ({children}) => {
    const router = useRouter()
    // const [loaded, setLoaded] = useLocalStorage('loaded', false);
    const {user, setError} = useContext(Context)

    useEffect(() => {
        if (!user && router.pathname === '/dashboard') {
            router.push('/')
            setError('Please login to access the Dashboard.')
        }
    }, [user])
    //
    // useEffect(() => {
    //     if (!loaded) setTimeout(() => {
    //         setLoaded(true)
    //         // setSplashGone(loaded => (!loaded))
    //     }, [1500])
    // }, []);


    // if (!loaded) {
    //     return <SplashScreen show={!loaded}/>
    // }
    return (
        <>
            <Navigation/>
            <Register/>
            {children}
            <ErrorSnackbar/>
        </>
    );
};

export default Layout;
