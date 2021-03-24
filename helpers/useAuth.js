import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSesion] = useState(null)

  const [loading, setLoading] = useState(1);
  const [reloading, setReloading] = useState(0);
  const [error, setError] = useState();
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      setCart(data);
    } catch (e) {
      console.log(e)
    }
  };

  const cancelToken = Axios.CancelToken;
  const source = cancelToken.source();

  const getUser = async () => {
    try {
      const session = await getSession();
      console.log(session);
      let user;
      console.log(session)
      if (session) {
        user = await Axios({
          method: 'post',
          url: '/participants',
          data: {
            'email': session.user.email
          },
          headers: {
            'Authorization': "Bearer"  + session.jwt
          }
        });
        setUser(user);
      }
      // return {
      // 	props: {
      // 		name: "Ayaan",
      // 		session,
      // 		user
      // 	}
      // }
      // const r = await Axios.get('/user', { cancelToken: source.token });
      // if (!Axios.isCancel()) {
      //   if (r.status === 200) {
      //     setUser(r.data.data);
      //     await getCart();
      //   }  else {
      //     console.log(r.message);
      //   }
      // }
    } catch (e) {
      if (
        !Axios.isCancel(e) &&
        e.message !== 'Request failed with status code 401'
      ) {
        console.log(e.response);
      }
    } finally {
      setLoading(0);
    }
  };

  const reload = () => {
    setReloading((localReload) => setReloading(!localReload));
    getCart();
  };

  useEffect(() => {
    getUser();
    return () => {
      source.cancel('Axios request cancelled!');
    };
  }, [reloading, setUser, setError, setLoading]);

  return {
    session,
    user,
    setUser

    // reload,
    // loading,
    // setLoading,
    // error,
    // cart,
  };
}