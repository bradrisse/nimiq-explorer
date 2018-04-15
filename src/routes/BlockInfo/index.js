import React from "react";
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as blockActions} from "ducks/blocks";
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import {Link} from 'react-router-dom';
import List, {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import moment from 'moment';
import {hex2ascii} from 'utils';
const styles = theme => ({
    card: {
        maxWidth: 600,
        width: '100%',
        background: 'white',
        overflowWrap: 'break-word'
    },
    header: {
        background: '#F0F0F0',
        padding: 15,
        overflowWrap: 'break-word'
    }
});


class BlockInfo extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.height !== this.props.match.params.height) {
            this.fetchBlock(nextProps.match.params.height);
        }
    }

    componentWillMount() {
        this.fetchBlock(this.props.match.params.height)
    }

    fetchBlock = (_height) => {
        console.log('_height ', _height);
        if (_height) {
            this.props.blockActions.fetchBlock(_height)
        }
    }

    render() {
        const {classes, blocks} = this.props;
        return (
            <Grid container justify="center">
                <Grid item>
                    {window.Nimiq.Policy && blocks.single && <Card className={classes.card}>
                        <div className={classes.header}>
                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="title">Height</Typography>
                                    <Typography variant="display2">#{blocks.single.height}</Typography>
                                    <Link to={`/block/${blocks.single.height + 1}`}>
                                        <IconButton>
                                            <ArrowUpIcon />
                                        </IconButton>
                                    </Link>
                                    <Link to={`/block/${blocks.single.height - 1}`}>
                                        <IconButton>
                                            <ArrowDownIcon />
                                        </IconButton>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="title">Hash</Typography>
                                    <Typography variant="caption">{blocks.single.hash}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Transactions"
                                            />
                                            <ListItemSecondaryAction>
                                                {blocks.single.transaction_count}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Transaction Value"
                                            />
                                            <ListItemSecondaryAction>
                                                {window.Nimiq.Policy.satoshisToCoins(blocks.single.value)} NIM
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Block Reward"
                                            />
                                            <ListItemSecondaryAction>
                                                {window.Nimiq.Policy.satoshisToCoins(blocks.single.reward)} NIM
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Timestamp"
                                            />
                                            <ListItemSecondaryAction>
                                                {moment(blocks.single.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Difficulty"
                                            />
                                            <ListItemSecondaryAction>
                                                {blocks.single.difficulty}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Size"
                                            />
                                            <ListItemSecondaryAction>
                                                {blocks.single.size} Bytes
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Miner"
                                            />
                                            <ListItemSecondaryAction>
                                                <Link to={`/account/${blocks.single.miner_address}`}>{blocks.single.miner_address}</Link>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <ListItemText
                                                        primary="Extra Data"
                                                    />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    {blocks.single.extra_data}
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            {blocks.single.transactions.map((transaction, index) => (
                                <Grid container key={index}>
                                    <Grid item xs={12} sm={5}>
                                        <Typography variant="title">Sender</Typography>
                                        <Typography variant="caption"><Link to={`/account/${transaction.sender_address}`}>{transaction.sender_address}</Link></Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Typography variant="title">Receiver</Typography>
                                        <Typography variant="caption"><Link to={`/account/${transaction.receiver_address}`}>{transaction.receiver_address}</Link></Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="title">Value</Typography>
                                        <Typography variant="caption">{window.Nimiq.Policy.satoshisToCoins(transaction.value)} NIM</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </CardContent>
                    </Card>}
                </Grid>
            </Grid>
        );
    }
}

BlockInfo.propTypes = {
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
)(BlockInfo);
