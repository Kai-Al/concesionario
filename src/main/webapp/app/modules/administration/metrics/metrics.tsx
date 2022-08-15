import React from 'react';
import { connect } from 'react-redux';
import { Table, Progress, Col, Row, Button } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_WHOLE_NUMBER_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT } from 'app/config/constants';
import { systemMetrics, systemThreadDump } from '../administration.reducer';
import MetricsModal from './metrics-modal';
import { IRootState } from 'app/shared/reducers';

export interface IMetricsPageProps extends StateProps, DispatchProps {}

export interface IMetricsPageState {
  showModal: boolean;
}

export class MetricsPage extends React.Component<IMetricsPageProps, IMetricsPageState> {
  state: IMetricsPageState = {
    showModal: false
  };

  componentDidMount() {
    this.props.systemMetrics();
  }

  getMetrics = () => {
    if (!this.props.isFetching) {
      this.props.systemMetrics();
    }
  }

  getThreadDump = () => {
    this.props.systemThreadDump();
    this.setState({
      showModal: true
    });
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
  }

  filterNaN = input => isNaN(input) ? 0 : input;

  getStats = metrics => {
    const stat = {
      servicesStats: {},
      cachesStats: {}
    };
    if (!this.props.isFetching && metrics && metrics.application) {
      Object.keys(metrics.application).forEach((key, indexNm) => {
        if (key.indexOf('com.udea.concesionario.controller') !== -1) {
          stat.servicesStats[key] = metrics.application[key];
        } else if (key.indexOf('net.sf.ehcache.Cache') !== -1) {
          // remove gets or puts
          const index = key.lastIndexOf('.');
          const newKey = key.substr(0, index);
          // Keep the name of the domain
          stat.cachesStats[newKey] = {
            name: newKey,
            value: metrics.application[key]
          };
        }
      });

    }
    return stat;
  }

  gaugeRow = (metrics, label: String, key) => (
    metrics.base[key] ?
      <Row>
        <Col md="9">{label}</Col>
        <Col md="3" className="text-right">
          {metrics.base[key]}
        </Col>
      </Row>
      : null
  );

  renderModal = () => <MetricsModal handleClose={this.handleClose} showModal={this.state.showModal} threadDump={this.props.threadDump}/>;

  renderBase = metrics => (
    <Row>
      <Col sm="12">
        <h3>JVM Metrics</h3>
        <Row>
          <Col md="4">
            <b>Memory</b>

            <p>
              <span>Heap Memory</span> (
                <TextFormat
                  value={metrics.base['memory.usedHeap'] / 1048576}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                M / <TextFormat
                  value={metrics.base['memory.maxHeap'] / 1048576}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                M)
            </p>
            <Progress animated
              min="0"
              max={metrics.base['memory.maxHeap']}
              value={metrics.base['memory.usedHeap']}
              color="success"
            >
              <span>
                <TextFormat
                  value={metrics.base['memory.usedHeap'] * 100 / metrics.base['memory.maxHeap']}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                %
              </span>
            </Progress>

            <p>
              <span>Non-Heap Memory</span> (
                <TextFormat
                  value={metrics.base['memory.usedNonHeap'] / 1048576}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                M / <TextFormat
                  value={metrics.base['memory.committedNonHeap'] / 1048576}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                M)
            </p>
            <Progress animated
              min="0"
              max={metrics.base['memory.committedNonHeap']}
              value={metrics.base['memory.usedNonHeap']}
              color="success"
            >
              <span>
                <TextFormat
                  value={metrics.base['memory.usedNonHeap'] * 100 / metrics.base['memory.committedNonHeap']}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                %
              </span>
            </Progress>
          </Col>
          <Col md="4">
            <b>Threads</b> (Total: {metrics.base['thread.count']} / {metrics.base['thread.max.count']})
            <p><span>Live</span> {metrics.base['thread.count']}</p>
            <Progress animated min="0" value={metrics.base['thread.count']} max={metrics.base['thread.max.count']} color="success">
              <span>
                <TextFormat
                  value={metrics.base['thread.count'] * 100 / metrics.base['thread.max.count']}
                  type="number"
                  format={APP_WHOLE_NUMBER_FORMAT} />
                %
              </span>
            </Progress>
          </Col>
          <Col md="4">
            <b>Garbage collections</b>

            {this.gaugeRow(metrics, 'Mark Sweep count', 'gc.MarkSweepCompact.count')}
            {this.gaugeRow(metrics, 'Mark Sweep time', 'gc.MarkSweepCompact.time')}
            {this.gaugeRow(metrics, 'Scavenge count', 'gc.Copy.count')}
            {this.gaugeRow(metrics, 'Scavenge time', 'gc.Copy.time')}

            {this.gaugeRow(metrics, 'Mark Sweep count', 'gc.PS MarkSweep.count')}
            {this.gaugeRow(metrics, 'Mark Sweep time', 'gc.PS MarkSweep.time')}
            {this.gaugeRow(metrics, 'Scavenge count', 'gc.PS Scavenge.count')}
            {this.gaugeRow(metrics, 'Scavenge time', 'gc.PS Scavenge.time')}
          </Col>
        </Row>
      </Col>
    </Row>
    )

  render() {
    const { metrics, isFetching } = this.props;
    const data = metrics || {};
    const { servicesStats, cachesStats } = this.getStats(data);
    return (
        <div>
          <h2 className="metrics-page-heading">Application Metrics</h2>
          <p>
            <Button onClick={this.getMetrics} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
              <FontAwesomeIcon icon="sync" />&nbsp;
              <Translate component="span" contentKey="health.refresh.button">Refresh</Translate>
            </Button>
          </p>
          <hr />
          {metrics.base ? this.renderBase(metrics) : ''}

          { metrics.application ?
            <Row>
              <Col sm="12">
                <h3>HTTP requests (events per second)</h3>
                <p>
                  <span>Active requests:</span> <b>
                    <TextFormat
                      value={metrics.application['InstrumentedFilter.activeRequests'].count}
                      type="number"
                      format={APP_WHOLE_NUMBER_FORMAT} />
                  </b> - <span>Total requests:</span> <b>
                    <TextFormat
                      value={metrics.application['InstrumentedFilter.requests'].count}
                      type="number"
                      format={APP_WHOLE_NUMBER_FORMAT} />
                  </b>
                </p>
                <Table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Count</th>
                      <th className="text-right">Mean</th>
                      <th className="text-right"><span>Average</span> (1 min)</th>
                      <th className="text-right"><span>Average</span> (5 min)</th>
                      <th className="text-right"><span>Average</span> (15 min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={0}>
                      <td>OK</td>
                      <td>
                        <Progress
                          min="0"
                          max={metrics.application['InstrumentedFilter.requests'].count}
                          value={metrics.application['InstrumentedFilter.responseCodes.ok'].count}
                          color="success"
                          animated
                        />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.ok'].meanRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.ok'].oneMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.ok'].fiveMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.ok'].fifteenMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                    </tr>
                    <tr key={1}>
                      <td>Not Found</td>
                      <td>
                        <Progress
                          min="0"
                          max={metrics.application['InstrumentedFilter.requests'].count}
                          value={metrics.application['InstrumentedFilter.responseCodes.notFound'].count}
                          color="success"
                          animated
                        />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.notFound'].meanRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.notFound'].oneMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.notFound'].fiveMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.notFound'].fifteenMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                    </tr>
                    <tr key={2}>
                      <td>Server Error</td>
                      <td>
                        <Progress
                          min="0"
                          max={metrics.application['InstrumentedFilter.requests'].count}
                          value={metrics.application['InstrumentedFilter.responseCodes.serverError'].count}
                          color="success"
                          animated
                        />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.serverError'].meanRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.serverError'].oneMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.serverError'].fiveMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                      <td className="text-right">
                        <TextFormat
                          value={this.filterNaN(metrics.application['InstrumentedFilter.responseCodes.serverError'].fifteenMinRate)}
                          type="number"
                          format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          : ''}
          { servicesStats ?
          <Row>
            <Col sm="12">
              <h3>Services statistics (time in millisecond)</h3>
            </Col>
            <Table>
              <thead>
                <tr>
                  <th>Service name</th>
                  <th>Count</th>
                  <th>Mean</th>
                  <th>Min</th>
                  <th>p50</th>
                  <th>p75</th>
                  <th>p95</th>
                  <th>p99</th>
                  <th>Max</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(servicesStats).map((key, index) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{servicesStats[key].count}</td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].mean}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].min}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].p50}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].p75}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].p95}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].p99}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                    <td>
                      <TextFormat
                        value={servicesStats[key].max}
                        type="number"
                        format={APP_WHOLE_NUMBER_FORMAT} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          : ''}

          {this.renderModal()}

        </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  metrics: storeState.administration.metrics,
  isFetching: storeState.administration.loading,
  threadDump: storeState.administration.threadDump
});

const mapDispatchToProps = { systemMetrics, systemThreadDump };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MetricsPage);
