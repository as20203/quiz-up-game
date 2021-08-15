import { Landing, Header, Login, Signup } from 'components';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'MyHistory';
const App = () => {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Router>
      <Landing />;
    </>
  );
};

export default App;
