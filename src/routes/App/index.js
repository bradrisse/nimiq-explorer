import React, {Component} from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import './App.css';
import Layout from 'components/Layout';
import {compose} from 'recompose';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "ducks/nimiq";

import Home from 'routes/Home';
import About from 'routes/About';
import BlockInfo from 'routes/BlockInfo';
import AccountInfo from 'routes/AccountInfo';
import GlobalHashRate from 'routes/Charts/GlobalHashRate';
import HashingDistribution from 'routes/Charts/HashingDistribution';


class App extends Component {

    componentWillMount() {
        this.init()
    }

    _onConsensusEstablished() {
        console.log('_onConsensusEstablished')
        this.props.nimiqActions.updateConsensus(true);
    }

    _onHeadChanged() {
        const height = window.$.blockchain.height;
        console.log(`Now at height ${height}.`);
        this.props.nimiqActions.updateHeight(height);
    }

    _onPeersChanged() {
        console.log(`Now connected to ${window.$.network.peerCount} peers.`);
    }

    init() {
        let self = this;
        window.Nimiq.init(async function() {
            const $ = {};
            window.$ = $;
            const config = Nimiq.GenesisConfig.CONFIGS['dev'];
            Nimiq.GenesisConfig.init(config);
            $.consensus = await window.Nimiq.Consensus.nano();

            $.blockchain = $.consensus.blockchain;
            $.mempool = $.consensus.mempool;
            $.network = $.consensus.network;

            $.consensus.on('established', () => self._onConsensusEstablished());
            $.consensus.on('lost', () => console.error('Consensus lost'));
            $.blockchain.on('head-changed', () => self._onHeadChanged());
            $.network.on('peers-changed', () => self._onPeersChanged());
            $.network.connect();
            
        }, function(code) {
            switch (code) {
                case window.Nimiq.ERR_WAIT:
                    alert('Error: Already open in another tab or window.');
                    break;
                case window.Nimiq.ERR_UNSUPPORTED:
                    alert('Error: Browser not supported');
                    break;
                default:
                    alert('Error: Nimiq initialization error');
                    break;
            }
        });
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/charts/global-hashrate' component={GlobalHashRate}/>
                    <Route exact path='/charts/hashing-distribution' component={HashingDistribution}/>
                    <Route path='/block/:height' component={BlockInfo}/>
                    <Route path='/account/:address' component={AccountInfo}/>
                </Layout>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        nimiqActions: bindActionCreators(nimiqActions, dispatch)
    };
}

export default compose(
    connect(mapStateToProps, mapPropsToDispatch)
)(App);
