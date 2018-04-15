import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';

class QuickStats extends React.Component {
    render() {
        return (
            <Grid container>
            	<Grid item xs={12}>
            		<Typography variant="title" component="h5">QUICK STATS</Typography>
            	</Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Global Hashrate" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Last Block" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Avg Block Time" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Difficulty" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Unique Miners" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Transactions" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Transaction Volume" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
                <Grid item xs={3}>
                	<Card>
	                	<CardHeader title="Peer Count" subheader="Last 24 hrs"/>
	                	<CardContent>
	                		1
	                	</CardContent>
	                </Card>
                </Grid>
            </Grid>
        );
    }
}

export default QuickStats;