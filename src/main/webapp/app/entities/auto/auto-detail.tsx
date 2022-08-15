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
import { getEntity } from './auto.reducer';
import { IAuto } from 'app/shared/model/auto.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAutoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{id: string}>  {}

export class AutoDetail extends React.Component<IAutoDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { autoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="concesionarioApp.auto.detail.title">Auto</Translate> [<b>{autoEntity.id}</b>]
          </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="Modelo">
                  <Translate contentKey="concesionarioApp.auto.Modelo">
                    Modelo
                  </Translate>
                </span>
              </dt>
              <dd>
              {autoEntity.Modelo}
              </dd>
              <dt>
                <span id="Foto">
                  <Translate contentKey="concesionarioApp.auto.Foto">
                    Foto
                  </Translate>
                </span>
              </dt>
              <dd>
              {autoEntity.Foto}
              </dd>
              <dt>
                <span id="Precio">
                  <Translate contentKey="concesionarioApp.auto.Precio">
                    Precio
                  </Translate>
                </span>
              </dt>
              <dd>
              {autoEntity.Precio}
              </dd>
              <dt>
                <span id="Descripcion">
                  <Translate contentKey="concesionarioApp.auto.Descripcion">
                    Descripcion
                  </Translate>
                </span>
              </dt>
              <dd>
              {autoEntity.Descripcion}
              </dd>
              <dt>
                <Translate contentKey="concesionarioApp.auto.marca">
                  Marca
                </Translate>
              </dt>
              <dd>
                  {(autoEntity.marca) ? autoEntity.marca.Nombre : ''}
              </dd>
            </dl>
          <Button tag={Link} to="/entity/auto" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/auto/${autoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit">Edit</Translate></span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ auto }: IRootState) => ({
    autoEntity: auto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AutoDetail);
