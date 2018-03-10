import React from "react";
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as blockActions} from "ducks/blocks";
import Typography from 'material-ui/Typography';
import Block from "./block";

const styles = theme => ({
    wrap: {
        padding: 30,
        width: '70%',
        margin: '0 auto'
    }
});

class LatestBlocks extends React.Component {

    componentWillMount() {
        this.props.blockActions.fetchLatestBlocks()
    }

    render() {
        const {blocks, classes} = this.props;
        return (
            <div className={classes.wrap}>
                <Typography variant="title" component="h5">LATEST BLOCKS</Typography>
                {blocks.latest && blocks.latest.map((block, index) => (
                    <Block key={index} block={block}/>
                ))}
            </div>
        );
    }
}

LatestBlocks.propTypes = {
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
    connect(mapStateToProps, mapPropsToDispatch),
    withStyles(styles)
)(LatestBlocks);
