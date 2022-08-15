import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntities
} from './auto.reducer';
import { IAuto } from 'app/shared/model/auto.model';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAutoProps extends StateProps, DispatchProps, RouteComponentProps<{url: string}> {}


export class Auto extends React.Component<IAutoProps> {

  componentDidMount() {
    this.props.getEntities();
  }





  render() {
    const { autoList, match} = this.props;
    return (
      <div>
        <h2 id="auto-heading">
          <Translate contentKey="concesionarioApp.auto.home.title">Autoes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="concesionarioApp.auto.home.createLabel">
              Create new Auto
            </Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="concesionarioApp.auto.Modelo">Modelo</Translate></th>
                <th><Translate contentKey="concesionarioApp.auto.Foto">Foto</Translate></th>
                <th><Translate contentKey="concesionarioApp.auto.Precio">Precio</Translate></th>
                <th><Translate contentKey="concesionarioApp.auto.Descripcion">Descripcion</Translate></th>
                <th><Translate contentKey="concesionarioApp.auto.marca">Marca</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                autoList.map((auto, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${auto.id}`} color="link" size="sm">
                      {auto.id}
                    </Button>
                  </td>
                  <td>
                    {auto.Modelo}
                  </td>
                  <td>
                    {auto.Foto}
                  </td>
                  <td>
                    {auto.Precio}
                  </td>
                  <td>
                    {auto.Descripcion}
                  </td>
                  <td>
                      {auto.marca ?
                      <Link to={`marca/${auto.marca.id}`}>
                        {auto.marca.Nombre}
                      </Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${auto.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view">View</Translate></span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${auto.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit">Edit</Translate></span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${auto.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete">Delete</Translate></span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auto }: IRootState) => ({
  autoList: auto.entities,
});

const mapDispatchToProps = {
 getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Auto);
