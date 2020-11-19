import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Issues } from './pages/issues';
import './styles/styles.scss';

const Issue = React.lazy(() => import('./pages/issue'));

export const App = () => (
  <div className="container mx-auto p-5">
    <h1 className="flex justify-center text-5xl font-bold">Github Issues</h1>
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path="/issue/:issueNumber" component={Issue} />
        <Route path="/issues">
          <Issues />
        </Route>
        <Redirect exact from="/" to="/issues" />
      </Switch>
    </Suspense>
  </div>
);
