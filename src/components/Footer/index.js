import React from 'react';
import Typography from 'material-ui/Typography';

class Footer extends React.Component {
    render() {
        return (
            <div id="footer">
                <Typography variant="caption">This web application is built on top of the Nimiq Blockchain. View Source Code on Github.</Typography>
            </div>
        );
    }
}

export default Footer;