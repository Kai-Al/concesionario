import React from 'react';
import {
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
        <DropdownItem tag={Link} to="/entity/auto">
             <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.auto" />
        </DropdownItem>
        <DropdownItem tag={Link} to="/entity/marca">
             <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.marca" />
        </DropdownItem>
    {/* needle-add-entity-to-menu - add entities to the menu here */}
  </NavDropdown>
);
