import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Auto from './auto';
import Marca from './marca';
/* needle-add-route-import - add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
<ErrorBoundaryRoute path={`${match.url}/auto`} component={Auto} />
<ErrorBoundaryRoute path={`${match.url}/marca`} component={Marca} />
      {/* needle-add-route-path - routes here */}
    </Switch>
  </div>
);

export default Routes;
