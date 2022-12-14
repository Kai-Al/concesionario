
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { REQUEST, FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import administration, {
  ACTION_TYPES,
  systemHealth,
  systemMetrics,
  systemThreadDump,
  getLoggers,
  changeLogLevel,
} from 'app/modules/administration/administration.reducer';

describe('Administration reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      totalItems: 0
    });
    expect(isEmpty(state.logs.loggers));
    expect(isEmpty(state.threadDump));
  }

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(administration(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(administration(undefined, {}));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes(
        [
          REQUEST(ACTION_TYPES.FETCH_LOGS),
          REQUEST(ACTION_TYPES.FETCH_HEALTH),
          REQUEST(ACTION_TYPES.FETCH_METRICS),
          REQUEST(ACTION_TYPES.FETCH_THREAD_DUMP),
        ],
        {},
        state => {
          expect(state).toMatchObject({
            errorMessage: null,
            loading: true
          });
        }
      );
    });
  });

  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      testMultipleTypes(
        [
          FAILURE(ACTION_TYPES.FETCH_LOGS),
          FAILURE(ACTION_TYPES.FETCH_HEALTH),
          FAILURE(ACTION_TYPES.FETCH_METRICS),
          FAILURE(ACTION_TYPES.FETCH_THREAD_DUMP),
        ],
        'something happened',
        state => {
          expect(state).toMatchObject({
            loading: false,
            errorMessage: 'something happened'
          });
        }
      );
    });
  });

  describe('Success', () => {
    it('should update state according to a successful fetch logs request', () => {
      const payload = { data: [{ name: 'ROOT', level: 'DEBUG' }] };
      const toTest = administration(undefined, { type: SUCCESS(ACTION_TYPES.FETCH_LOGS), payload });

      expect(toTest).toMatchObject({
        loading: false,
        logs: { loggers: payload.data }
      });
    });

    it('should update state according to a successful fetch health request', () => {
      const payload = { data: { status: 'UP' } };
      const toTest = administration(undefined, { type: SUCCESS(ACTION_TYPES.FETCH_HEALTH), payload });

      expect(toTest).toMatchObject({
        loading: false,
        health: payload.data
      });
    });

    it('should update state according to a successful fetch metrics request', () => {
      const payload = { data: { version: '3.1.3', gauges: {} } };
      const toTest = administration(undefined, { type: SUCCESS(ACTION_TYPES.FETCH_METRICS), payload });

      expect(toTest).toMatchObject({
        loading: false,
        metrics: payload.data
      });
    });

    it('should update state according to a successful fetch thread dump request', () => {
      const payload = { data: [{ threadName: 'hz.gateway.cached.thread-6', threadId: 9266 }] };
      const toTest = administration(undefined, { type: SUCCESS(ACTION_TYPES.FETCH_THREAD_DUMP), payload });

      expect(toTest).toMatchObject({
        loading: false,
        threadDump: payload.data
      });
    });


  });
  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware()]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
    });
    it('dispatches FETCH_HEALTH_PENDING and FETCH_HEALTH_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_HEALTH)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_HEALTH),
          payload: resolvedObject
        }
      ];
      await store.dispatch(systemHealth()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it('dispatches FETCH_METRICS_PENDING and FETCH_METRICS_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_METRICS)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_METRICS),
          payload: resolvedObject
        }
      ];
      await store.dispatch(systemMetrics()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it('dispatches FETCH_THREAD_DUMP_PENDING and FETCH_THREAD_DUMP_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_THREAD_DUMP)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_THREAD_DUMP),
          payload: resolvedObject
        }
      ];
      await store.dispatch(systemThreadDump()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it('dispatches FETCH_LOGS_PENDING and FETCH_LOGS_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_LOGS)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_LOGS),
          payload: resolvedObject
        }
      ];
      await store.dispatch(getLoggers()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
    it('dispatches FETCH_LOGS_CHANGE_LEVEL_PENDING and FETCH_LOGS_CHANGE_LEVEL_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL),
          payload: resolvedObject
        },
        {
          type: REQUEST(ACTION_TYPES.FETCH_LOGS)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_LOGS),
          payload: resolvedObject
        }
      ];
      await store.dispatch(changeLogLevel('ROOT', 'DEBUG')).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
