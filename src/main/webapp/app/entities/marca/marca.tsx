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
} from './marca.reducer';
import { IMarca } from 'app/shared/model/marca.model';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMarcaProps extends StateProps, DispatchProps, RouteComponentProps<{url: string}> {}


export class Marca extends React.Component<IMarcaProps> {

  componentDidMount() {
    this.props.getEntities();
  }





  render() {
    const { marcaList, match} = this.props;
    return (
      <div>
        <h2 id="marca-heading">
          <Translate contentKey="concesionarioApp.marca.home.title">Marcas</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="concesionarioApp.marca.home.createLabel">
              Create new Marca
            </Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="concesionarioApp.marca.Nombre">Nombre</Translate></th>
                <th><Translate contentKey="concesionarioApp.marca.Pais">Pais</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                marcaList.map((marca, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${marca.id}`} color="link" size="sm">
                      {marca.id}
                    </Button>
                  </td>
                  <td>
                    {marca.Nombre}
                  </td>
                  <td>
                    {marca.Pais}
                  </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${marca.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view">View</Translate></span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${marca.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit">Edit</Translate></span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${marca.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ marca }: IRootState) => ({
  marcaList: marca.entities,
});

const mapDispatchToProps = {
 getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Marca);
