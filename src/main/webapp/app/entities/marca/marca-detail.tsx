import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAction,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './marca.reducer';
import { IMarca } from 'app/shared/model/marca.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMarcaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{id: string}>  {}

export class MarcaDetail extends React.Component<IMarcaDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { marcaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="concesionarioApp.marca.detail.title">Marca</Translate> [<b>{marcaEntity.id}</b>]
          </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="Nombre">
                  <Translate contentKey="concesionarioApp.marca.Nombre">
                    Nombre
                  </Translate>
                </span>
              </dt>
              <dd>
              {marcaEntity.Nombre}
              </dd>
              <dt>
                <span id="Pais">
                  <Translate contentKey="concesionarioApp.marca.Pais">
                    Pais
                  </Translate>
                </span>
              </dt>
              <dd>
              {marcaEntity.Pais}
              </dd>
            </dl>
          <Button tag={Link} to="/entity/marca" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/marca/${marcaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit">Edit</Translate></span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ marca }: IRootState) => ({
    marcaEntity: marca.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MarcaDetail);
