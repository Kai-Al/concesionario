import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Marca from './marca';
import MarcaDetail from './marca-detail';
import MarcaUpdate from './marca-update';
import MarcaDeleteDialog from './marca-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MarcaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MarcaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MarcaDetail}  />
      <ErrorBoundaryRoute path={match.url} component={Marca} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MarcaDeleteDialog} />
  </>
);

export default Routes;
