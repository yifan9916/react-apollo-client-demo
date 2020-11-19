import React, { Fragment, useState } from 'react';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';

import { IssuesList } from '../components/IssuesList/IssuesList';
import { SearchBox } from '../components/SearchBox/SearchBox';
import { IssueState } from '../generated/github';

export const Issues = () => {
  const routeMatch = useRouteMatch();
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (query: string) => {
    setSearchText(() => query);
  };

  return (
    <Fragment>
      <div className="flex justify-center p-6">
        <NavLink
          className="p-2 hover:underline"
          activeClassName="text-green-500 underline"
          to={`${routeMatch.url}/open`}
        >
          Open Issues
        </NavLink>{' '}
        <NavLink
          className="p-2 hover:underlin"
          activeClassName="text-red-500 underline"
          to={`${routeMatch.url}/closed`}
        >
          Closed Issues
        </NavLink>
      </div>

      <SearchBox onSubmit={handleSubmit} />

      <Switch>
        <Route path={`${routeMatch.path}/open`}>
          <IssuesList searchText={searchText} state={IssueState.Open} />
        </Route>
        <Route path={`${routeMatch.path}/closed`}>
          <IssuesList searchText={searchText} state={IssueState.Closed} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Issues;
