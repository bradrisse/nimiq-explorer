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
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import List, { ListItem,  ListItemSecondaryAction,  ListItemText,} from 'material-ui/List';
import {Link} from 'react-router-dom';
import moment from 'moment';

const styles = theme => ({
    card: {
        maxWidth: 900,
        width: '100%',
        background: 'white'
    },
    header: {
        background: '#F0F0F0',
        padding: 15
    }
});


class AccountInfo extends React.Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.address !== this.props.match.params.address) {
            this.fetchBlock(nextProps.match.params.address);
        }
    }

    componentWillMount() {
        this.fetchBlock(this.props.match.params.address)
    }

    fetchBlock = (_address) => {
        console.log('_address ', _address);
        if (_address) {
            this.props.blockActions.fetchAccount((_address).replace(/\+/g, ' '))
        }
    }

    render() {
        const {classes, blocks} = this.props;
        const {value} = this.state;
        return (
            <Grid container justify="center">
                <Grid item>
                    {window.Nimiq.Policy && blocks.account && <div><Card className={classes.card}>
                        <div className={classes.header}>
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <Typography variant="title">Address</Typography>
                                    <Typography variant="caption">{blocks.account.address}</Typography>

                                </Grid>
                            </Grid>
                        </div>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Balance"
                                            />
                                            <ListItemSecondaryAction>
                                                {window.Nimiq.Policy.satoshisToCoins(blocks.account.balance)} NIM
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Nonce"
                                            />
                                            <ListItemSecondaryAction>
                                                {blocks.account.nonce}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange} fullWidth>
                            <Tab label="Transactions" />
                            <Tab label="Blocks" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <div>
                        <List>
                        {blocks.account.transactions.map((transaction, index) => (

                                <div>
                                    <ListItem>
                                        <ListItemText
                                            primary="Sent Transaction"
                                            secondary={moment(transaction.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')}
                                        />
                                        <ListItemSecondaryAction>
                                            {window.Nimiq.Policy.satoshisToCoins(transaction.value)}
                                        </ListItemSecondaryAction>
                                        <br/>
                                    </ListItem>
                                    {transaction.receiver_address}
                                </div>
                        ))}
                        </List>
                    </div>}
                    {value === 1 && <div>
                        <List>
                            {blocks.account.blocks.map((block, index) => (

                                <div key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={<div>Mined Block<Link to={`/block/${block.height}`}>#{block.height}</Link></div>}
                                            secondary={moment(block.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a')}
                                        />
                                        <ListItemSecondaryAction>
                                            {window.Nimiq.Policy.satoshisToCoins(block.reward)} NIM
                                        </ListItemSecondaryAction>
                                        <br/>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </div>}
                    </div>}
                </Grid>
            </Grid>
        );
    }
}

AccountInfo.propTypes = {
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
)(AccountInfo);
