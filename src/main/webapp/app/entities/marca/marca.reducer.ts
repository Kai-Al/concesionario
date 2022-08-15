import axios from 'axios';
import {
  ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMarca, defaultValue } from 'app/shared/model/marca.model';

export const ACTION_TYPES = {
  FETCH_MARCA_LIST: 'marca/FETCH_MARCA_LIST',
  FETCH_MARCA:  'marca/FETCH_MARCA',
  CREATE_MARCA: 'marca/CREATE_MARCA',
  UPDATE_MARCA: 'marca/UPDATE_MARCA',
  DELETE_MARCA: 'marca/DELETE_MARCA',
  RESET: 'marca/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMarca>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MarcaState =  Readonly<typeof initialState>;

// Reducer

export default (state: MarcaState = initialState, action): MarcaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MARCA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MARCA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MARCA):
    case REQUEST(ACTION_TYPES.UPDATE_MARCA):
    case REQUEST(ACTION_TYPES.DELETE_MARCA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MARCA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MARCA):
    case FAILURE(ACTION_TYPES.CREATE_MARCA):
    case FAILURE(ACTION_TYPES.UPDATE_MARCA):
    case FAILURE(ACTION_TYPES.DELETE_MARCA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARCA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARCA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MARCA):
    case SUCCESS(ACTION_TYPES.UPDATE_MARCA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MARCA):
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

const apiUrl = 'api/marca';

// Actions

export const getEntities: ICrudGetAllAction<IMarca> = (page, size, sort) =>
({
  type: ACTION_TYPES.FETCH_MARCA_LIST,
  payload: axios.get<IMarca>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMarca> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MARCA,
    payload: axios.get<IMarca>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMarca> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MARCA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMarca> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MARCA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMarca> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MARCA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};


export const reset = () => ({
  type: ACTION_TYPES.RESET
});
