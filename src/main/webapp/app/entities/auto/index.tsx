import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Auto from './auto';
import AutoDetail from './auto-detail';
import AutoUpdate from './auto-update';
import AutoDeleteDialog from './auto-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AutoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AutoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AutoDetail}  />
      <ErrorBoundaryRoute path={match.url} component={Auto} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AutoDeleteDialog} />
  </>
);

export default Routes;
