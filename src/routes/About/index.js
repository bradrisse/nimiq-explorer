import React from "react";
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    card: {
        maxWidth: 600,
    }
})

class About extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>WHAT IS THIS?</Typography>
                            <Typography variant="body" component="p" gutterBottom>This website is a blockchain explorer for the new Nimiq blockchain project. Because the Nimiq blockchain lives in your browser, this website works without a server. All necessary information is present in the blockchain, loaded in this browser.</Typography>
                            <Typography variant="body" component="p">The source code for this website is open source and available at https://github.com/bradrisse/nimiq-explorer.To learn more about the Nimiq blockchain, visit the homepage, check out @nimiq on Twitter or Medium and join the Discord and Telegram channels.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles, {withTheme: true})(About);
