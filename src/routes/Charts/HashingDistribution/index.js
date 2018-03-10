import React from "react";
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as blockActions} from "ducks/blocks";
import { PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';


const ranges = [1, 2, 12, 24]

class GlobalHashRate extends React.Component {

    state = {
        range: 2,
    };

    componentWillMount() {
        this.fetchStatistics()
    }

    handleChange = (event, value) => {
        this.setState({ range: value }, () => {
            this.fetchStatistics()
        });
    };

    fetchStatistics = () => {
        this.props.blockActions.fetchStatistics('miners', ranges[this.state.range])
    }

    render() {
        const {blocks} = this.props;
        return (
            <div style={{maxWidth: 900, margin: '0 auto'}}>
                <Typography variant="title">Hashing Distribution</Typography>
                <Typography variant="subheading">Number of blocks mined per address</Typography>
                <Paper>
                    <Tabs
                        value={this.state.range}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        fullWidth
                    >
                        <Tab label="1 hour" />
                        <Tab label="2 hours" />
                        <Tab label="12 hours" />
                        <Tab label="24 hours" />
                    </Tabs>
                    <PieChart width={900} height={250}>
                        <Pie data={blocks.statistics} dataKey="blocks_mined" nameKey="miner_address" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    </PieChart>
                </Paper>
            </div>
        );
    }
}


GlobalHashRate.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        blocks: state.blocks
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        blockActions: bindActionCreators(blockActions, dispatch)
    };
}

export default compose(
    connect(mapStateToProps, mapPropsToDispatch)
)(GlobalHashRate);
