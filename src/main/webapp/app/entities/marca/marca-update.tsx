import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Label
   } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField  } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  getEntity,
  updateEntity,
  createEntity,
  reset
} from './marca.reducer';
import { IMarca } from 'app/shared/model/marca.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMarcaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{id: string}>  {}

export interface IMarcaUpdateState {
  isNew: boolean;
}

export class MarcaUpdate extends React.Component<IMarcaUpdateProps, IMarcaUpdateState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

  }


  saveEntity = (event, errors, values) => {

    if (errors.length === 0) {
      const { marcaEntity } = this.props;
      const entity = {
        ...marcaEntity,
        ...values
      }

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  }

  handleClose = () => {
    this.props.history.push('/entity/marca');
  }

  render() {
    const { marcaEntity, loading, updating } = this.props;
    const { isNew } = this.state;


    return (
      <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="concesionarioApp.marca.home.createOrEditLabel">
            <Translate contentKey="concesionarioApp.marca.home.createOrEditLabel">Create or edit a Marca</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          { loading ? <p>Loading...</p> :
          <AvForm model={isNew ? {} : marcaEntity} onSubmit={this.saveEntity} >
            { !isNew ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput id="marca-id" type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
            <Label id="NombreLabel" for="Nombre">
              <Translate contentKey="concesionarioApp.marca.Nombre">
                Nombre
              </Translate>
            </Label>
            <AvField id="marca-Nombre" type="text" name="Nombre" validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') }
                }}/>
            </AvGroup>
            <AvGroup>
            <Label id="PaisLabel" for="Pais">
              <Translate contentKey="concesionarioApp.marca.Pais">
                Pais
              </Translate>
            </Label>
            <AvField id="marca-Pais" type="text" name="Pais" validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') }
                }}/>
            </AvGroup>
            <Button tag={Link} id="cancel-save" to="/entity/marca" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />&nbsp;
              <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" type="submit" disabled={updating}>
              <FontAwesomeIcon icon="save" />&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </AvForm>
          }
        </Col>
      </Row>
    </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  marcaEntity: storeState.marca.entity,
  loading: storeState.marca.loading,
  updating: storeState.marca.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MarcaUpdate);
