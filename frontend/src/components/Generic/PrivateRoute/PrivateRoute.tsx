import React, { FC, useContext, useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { authContext } from 'services/auth';
import axios from 'axios';
import history from 'MyHistory';
interface PrivateRouteProps {
  component: FC<
    RouteComponentProps<
      {
        [x: string]: string | undefined;
      },
      StaticContext,
      unknown
    >
  >;
  isAdmin?: boolean;
  isContributor?: boolean;
  path: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  isAdmin,
  isContributor,
  ...rest
}) => {
  const [, dispatch] = useContext(authContext);
  const [authRoute, setAuthRoute] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const currentPath = history.location.pathname;
        const token = localStorage.getItem('token');
        if (token) {
          const verifyToken = await axios.post('/api/auth/verify-token');
          if (verifyToken) {
            if (isAdmin) {
              const {
                data: {
                  user: { category }
                }
              } = verifyToken;
              if (category !== 'admin') {
                throw new Error('Not Authenticated');
              }
            } else if (isContributor) {
              const {
                data: {
                  user: { category }
                }
              } = verifyToken;
              if (category !== 'contributor') {
                throw new Error('Not Authenticated');
              }
            }
            dispatch({ type: 'authenticated', user: verifyToken.data.user, value: true });
            setAuthRoute(true);
            history.push(currentPath);
          }
        } else {
          dispatch({ type: 'notauthenticated', user: null, value: false });
          localStorage.clear();
          sessionStorage.clear();
          history.goBack();
        }
      } catch (error) {
        dispatch({ type: 'notauthenticated', user: null, value: false });
        localStorage.clear();
        sessionStorage.clear();
        history.goBack();
      }
    };
    checkAuthentication();
  }, [dispatch, isAdmin, isContributor]);

  return <Route {...rest} render={props => (authRoute ? <Component {...props} /> : null)} />;
};

export { PrivateRoute };
