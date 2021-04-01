import Navigation from "../components/Navigation";
import Register from "../components/Register";
import ErrorSnackbar from "../components/ErrorSnackbar";
import {useRouter} from "next/router";
import {useContext, useEffect, useLayoutEffect} from "react";
import Context from "../Context";

const Layout = ({children}) => {
    const router = useRouter()
    const {user, setError} = useContext(Context)


    useLayoutEffect(() => {
        if (!user && router.pathname === '/dashboard') {
            router.push('/')
            setError('Please login to access the Dashboard.')
        }
    }, [user])

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
