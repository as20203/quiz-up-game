import {
  Landing,
  Header,
  Login,
  Signup,
  PrivateRoute,
  CategoriesPage,
  UsersPage
} from 'components';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'MyHistory';
import { AuthContextProvider } from 'services';
const App = () => {
  return (
    <AuthContextProvider>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute isAdmin={true} path='/categories' component={CategoriesPage} />
          <PrivateRoute isAdmin={true} path='/categories' component={CategoriesPage} />
          <PrivateRoute isAdmin={true} path='/users' component={UsersPage} />

          <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
