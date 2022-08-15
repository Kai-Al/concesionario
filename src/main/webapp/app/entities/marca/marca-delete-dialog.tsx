import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMarca } from 'app/shared/model/marca.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './marca.reducer';

export interface IMarcaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{id: string}>  {}

export class MarcaDeleteDialog extends React.Component<IMarcaDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.marcaEntity.id);
    this.handleClose(event);
  }

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { marcaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
      <ModalHeader toggle={this.handleClose}><Translate contentKey="entity.delete.title">Confirm delete operation</Translate></ModalHeader>
      <ModalBody id="concesionarioApp.marca.delete.question">
        <Translate contentKey="concesionarioApp.marca.delete.question" interpolate={{ id: marcaEntity.id }}>
            Are you sure you want to delete this Marca?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.handleClose}>
          <FontAwesomeIcon icon="ban" />&nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jee-confirm-delete-marca" color="danger" onClick={this.confirmDelete}>
          <FontAwesomeIcon icon="trash" />&nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
    );
  }
}

const mapStateToProps = ({ marca }: IRootState) => ({
    marcaEntity: marca.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MarcaDeleteDialog);
