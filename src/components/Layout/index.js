import React from 'react';
import { withStyles } from 'material-ui/styles';
import Search from 'components/Search';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LatestBlocks from 'components/LatestBlocks';

const styles = theme => ({
    wrap: {
        padding: theme.typography.pxToRem(30),
        marginTop: 64
    }
})

class Layout extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                    <div className={classes.wrap}>
                        <Search/>
                        {this.props.children}
                        <LatestBlocks/>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Layout);