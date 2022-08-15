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

import { IMarca } from 'app/shared/model/marca.model';
import { getEntities as getMarcas } from 'app/entities/marca/marca.reducer';
import {
  getEntity,
  updateEntity,
  createEntity,
  reset
} from './auto.reducer';
import { IAuto } from 'app/shared/model/auto.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAutoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{id: string}>  {}

export interface IAutoUpdateState {
  isNew: boolean;
  marcaId: string;
}

export class AutoUpdate extends React.Component<IAutoUpdateProps, IAutoUpdateState> {

  constructor(props) {
    super(props);
    this.state = {
      marcaId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getMarcas();
  }


  saveEntity = (event, errors, values) => {

    if (errors.length === 0) {
      const { autoEntity } = this.props;
      const entity = {
        ...autoEntity,
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
    this.props.history.push('/entity/auto');
  }

  render() {
    const { autoEntity, marcas, loading, updating } = this.props;
    const { isNew } = this.state;


    return (
      <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="concesionarioApp.auto.home.createOrEditLabel">
            <Translate contentKey="concesionarioApp.auto.home.createOrEditLabel">Create or edit a Auto</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          { loading ? <p>Loading...</p> :
          <AvForm model={isNew ? {} : autoEntity} onSubmit={this.saveEntity} >
            { !isNew ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput id="auto-id" type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
            <Label id="ModeloLabel" for="Modelo">
              <Translate contentKey="concesionarioApp.auto.Modelo">
                Modelo
              </Translate>
            </Label>
            <AvField id="auto-Modelo" type="text" name="Modelo" validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') }
                }}/>
            </AvGroup>
            <AvGroup>
            <Label id="FotoLabel" for="Foto">
              <Translate contentKey="concesionarioApp.auto.Foto">
                Foto
              </Translate>
            </Label>
            <AvField id="auto-Foto" type="text" name="Foto" />
            </AvGroup>
            <AvGroup>
              <Label id="PrecioLabel" for="Precio">
                <Translate contentKey="concesionarioApp.auto.Precio">
                  Precio
                </Translate>
              </Label>
              <AvField id="auto-Precio" type="string" className="form-control" name="Precio" validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') },
                number: { value: true, errorMessage: translate('entity.validation.number') }
                }} />
            </AvGroup>
            <AvGroup>
            <Label id="DescripcionLabel" for="Descripcion">
              <Translate contentKey="concesionarioApp.auto.Descripcion">
                Descripcion
              </Translate>
            </Label>
            <AvField id="auto-Descripcion" type="text" name="Descripcion" validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') }
                }}/>
            </AvGroup>
            <AvGroup>
              <Label for="marca.Nombre">
                <Translate contentKey="concesionarioApp.auto.marca">Marca</Translate>
              </Label>
              <AvInput
                id="auto-marca"
                type="select"
                className="form-control"
                name="marca.id"
              >
                <option value="" key="0" />
                {
                  marcas ? marcas.map(otherEntity =>
                    <option
                      value={otherEntity.id}
                      key={otherEntity.id}>
                      {otherEntity.Nombre}
                    </option>
                  ) : null
                }
              </AvInput>
            </AvGroup>
            <Button tag={Link} id="cancel-save" to="/entity/auto" replace color="info">
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
    marcas: storeState.marca.entities,
  autoEntity: storeState.auto.entity,
  loading: storeState.auto.loading,
  updating: storeState.auto.updating
});

const mapDispatchToProps = {
  getMarcas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AutoUpdate);
