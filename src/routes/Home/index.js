import React from "react";
import LatestBlocks from 'components/LatestBlocks';
import QuickStats from 'components/QuickStats';
import Grid from 'material-ui/Grid';

class Home extends React.Component {

    render() {
        const center ={
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
        return (
            <div className="Home" style={center}>
                <Grid container>
                    <Grid item xs={12}>
                        <QuickStats />
                    </Grid>
                    <Grid item xs={12}>
                        <LatestBlocks/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default Home;
