import React from 'react';
import {compose} from 'recompose';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "ducks/nimiq";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        minWidth: 200
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        color: 'white'
    }
};
class Header extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, nimiq } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Nimiq Explorer
                        </Typography>
                        <Grid container justify="flex-start">
                            <Grid item>
                                <Link to="/" className={classes.link}>
                                    <Button color="inherit">Home</Button>
                                </Link>
                                <Button
                                    color="inherit"
                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                >
                                    Charts
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <Link to="/charts/global-hashrate">
                                        <MenuItem onClick={this.handleClose}>Global HashRate</MenuItem>
                                    </Link>
                                    <Link to="/charts/hashing-distribution">
                                        <MenuItem onClick={this.handleClose}>Hashing Distribution</MenuItem>
                                    </Link>
                                </Menu>
                                <Link to="/about" className={classes.link}>
                                    <Button color="inherit">What is this?</Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="body1" color="inherit" align="right">
                                    Status: Connected @ {nimiq.height}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
    connect(mapStateToProps, mapPropsToDispatch),
    withStyles(styles)
)(Header);