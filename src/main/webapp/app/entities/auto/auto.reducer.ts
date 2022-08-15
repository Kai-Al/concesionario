import axios from 'axios';
import {
  ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAuto, defaultValue } from 'app/shared/model/auto.model';

export const ACTION_TYPES = {
  FETCH_AUTO_LIST: 'auto/FETCH_AUTO_LIST',
  FETCH_AUTO:  'auto/FETCH_AUTO',
  CREATE_AUTO: 'auto/CREATE_AUTO',
  UPDATE_AUTO: 'auto/UPDATE_AUTO',
  DELETE_AUTO: 'auto/DELETE_AUTO',
  RESET: 'auto/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAuto>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AutoState =  Readonly<typeof initialState>;

// Reducer

export default (state: AutoState = initialState, action): AutoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AUTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AUTO):
    case REQUEST(ACTION_TYPES.UPDATE_AUTO):
    case REQUEST(ACTION_TYPES.DELETE_AUTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AUTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUTO):
    case FAILURE(ACTION_TYPES.CREATE_AUTO):
    case FAILURE(ACTION_TYPES.UPDATE_AUTO):
    case FAILURE(ACTION_TYPES.DELETE_AUTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUTO):
    case SUCCESS(ACTION_TYPES.UPDATE_AUTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/auto';

// Actions

export const getEntities: ICrudGetAllAction<IAuto> = (page, size, sort) =>
({
  type: ACTION_TYPES.FETCH_AUTO_LIST,
  payload: axios.get<IAuto>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAuto> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUTO,
    payload: axios.get<IAuto>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAuto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAuto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAuto> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};


export const reset = () => ({
  type: ACTION_TYPES.RESET
});
