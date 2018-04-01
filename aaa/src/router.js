import React from 'react';
import { Router, Route, Switch, routerRedux, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;

const RouterConfig = function ({ history,app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });

  const Cashier = dynamic({
    app,
    models:()=>[import('./models/user')],
    component: () => import('./routes/Cashier'),
  });

  const Users = dynamic({
    app,
    models:()=>[import('./models/user')],
    component: () => import('./routes/usersPage'),
  });


  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/cashier" />)} />
          <Route path="/cashier" component={Cashier} />
          {/* <Route component={error} /> */}
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;
