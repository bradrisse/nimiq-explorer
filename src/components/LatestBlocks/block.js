import React from "react";
import {Link} from "react-router-dom";
import {withStyles} from 'material-ui/styles';
import {convertTime} from 'utils';

const styles = theme => ({
    wrap: {
        background: theme.palette.primary3Color,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "1rem 0",
        letterSpacing: "0.02em",
        border: "1px solid #D9DEE4",
        height: "45px"
    },
    heightWrap: {
        display: "inline", padding: "0.6em 1em", width: "10%"
    },
    time: {
        display: "inline",
        padding: "0.6em 1em",
        width: "10%"
    },
    count: {
        display: "inline", padding: "0.6em 1em", width: "10%"
    },
    link: {
        display: "inline",
        padding: "0.6em 1em",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "60%"
    },
    bytes: {
        display: "inline", padding: "0.6em 1em", width: "10%"
    }
});

class Block extends React.Component {
    render() {

        const {block, classes} = this.props;
        return (
            <div className={classes.wrap}>
                <div className={classes.heightWrap}>
                    <Link to={`/block/${block.height}`}>
                        #{block.height}
                    </Link>
                </div>
                <div className={classes.time}> {convertTime(block.timestamp)} </div>
                <div className={classes.count}>{block.transaction_count} txns
                </div>
                <div className={classes.link}>
                    found by <Link
                    to={`/account/${block.miner_address.replace(/ /g, "+")}`}>{block.miner_address}</Link>
                </div>
                <div className={classes.bytes}>{block.size} Bytes</div>
            </div>
        );
    }
}

export default withStyles(styles)(Block);
