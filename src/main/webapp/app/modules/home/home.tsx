import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2><Translate contentKey="home.title">Welcome, Java Duke!</Translate></h2>
          <p className="lead"><Translate contentKey="home.subtitle">This is your homepage</Translate></p>
          {
            (account && account.login) ? (
              <div>
                <Alert color="success">
                  <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>You are logged in as user {account.login}.</Translate>
                </Alert>
              </div>
            ) : (
              <div>
                <Alert color="warning">
                  <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                  <Link to="/login" className="alert-link"><Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate></Link>
                  <Translate contentKey="global.messages.info.authenticated.suffix">, you can try the default accounts:
                    <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                    <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                  </Translate>
                </Alert>

                <Alert color="warning">
                  <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                  <Link to="/register" className="alert-link"><Translate contentKey="global.messages.info.register.link">Register a new account</Translate></Link>
                </Alert>
              </div>
            )
          }
          <p>
            <Translate contentKey="home.question">If you have any question on Jeddict:</Translate>
          </p>

          <ul>
            <li>
              <a href="http://jeddict.github.io/" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.homepage">Jeddict homepage</Translate>
              </a>
            </li>
            <li>
              <a href="https://github.com/jeddict/jeddict/issues?state=open" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.bugtracker">Jeddict bug tracker</Translate>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/ImJeddict" target="_blank" rel="noopener noreferrer">
                <Translate contentKey="home.link.follow">follow @ImJeddict on Twitter</Translate>
              </a>
            </li>
          </ul>

          <p>Thanks to Java Hipster team for UI template</p>
          <p>
            <Translate contentKey="home.like">If you like Jeddict, do not forget to give us a star on</Translate>
            {' '}
            <a href="https://github.com/jeddict/jeddict" target="_blank" rel="noopener noreferrer">Github</a>!
          </p>
        </Col>
        <Col md="3" className="pad">
          <span className="app rounded" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
