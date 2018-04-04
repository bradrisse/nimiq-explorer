import React from "react";
import {compose} from 'recompose';
import { Field, reduxForm } from 'redux-form';
import Typography from 'material-ui/Typography';
import { TextField } from 'redux-form-material-ui';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {withRouter} from 'react-router-dom'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formWrap: {
        maxWidth: theme.typography.pxToRem(600),
        marginBottom: 30,
        width: '100%'
    }
});

const accountHashRegExp = new RegExp('^NQ[A-Z0-9 ]{42}'),
    blockHashRegExp   = new RegExp('^[A-Fa-f0-9]{64}$');

class Search extends React.Component {

    state = {
        detectedFormat: null,
        helperText: 'none'
    }

    submit = (values) => {
        const {detectedFormat} = this.state;
        if (detectedFormat !== 'none') {
            switch (detectedFormat) {
                case 'account':
                    this.props.history.push(`/account/${(values.search).replace(/ /g, '+')}`)
                    break;
                case 'block_tx_hash':
                    //this.props.history.push(`/block/${(values.search).replace(/ /g, '+')}`)
                    break;
                case 'block_number':
                    this.props.history.push(`/block/${(values.search)}`)
                    break;

                default:
                    console.log('unkown format')
                    break;    
            }
        }
    }

    detectFormat = (e, value) => {

        let _detectedFormat = this.state.detectedFormat;
        let _helperText = this.state.helperText;

        if(value.substr(0,2) === 'NQ') {
            value = value.replace(/[\+ ]/g, '').match(/.{4}/g).join(' ');
        }
        if(accountHashRegExp.test(value)) {
            _detectedFormat = "account";
            _helperText = "Account Address";
        }
        else if(blockHashRegExp.test(value) /*&& value[0] === "0" && value[1] === "0"*/) {
            _detectedFormat = "block_tx_hash";
            _helperText = "Block or Tx Hash";
        }
        else if(value.match(/^[0-9]*$/) && parseInt(value, 10)) {
            _detectedFormat = "block_number";
            _helperText = "Block Number";
        }

        this.setState({
            detectedFormat: _detectedFormat,
            helperText: _helperText
        })
    }

    render() {
        const {handleSubmit, classes} = this.props;
        const {helperText} = this.state;

        return (
            <Grid container justify="center">
                <Grid item className={classes.formWrap}>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <Typography variant="title" align="center" gutterBottom>Search accounts and blocks:</Typography>
                        <Grid container>
                            <Grid item style={{flex: '1 0 auto'}}>
                                <Field name="search" fullWidth component={TextField} placeholder="Address, block/tx hash or height" helperText={`Format Detected: ${helperText}`} onChange={this.detectFormat} required/>
                            </Grid>
                            <Grid item style={{flex: '1 0 auto', maxWidth: 100}}>
                                <Button className={classes.button} type="submit" variant="raised" color="secondary">Go</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default compose(
    withRouter,
    reduxForm({form: 'searchForm'}),
    withStyles(styles, {withTheme: true})
)(Search);
