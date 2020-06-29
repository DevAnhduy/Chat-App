import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class CIRCLE_LOADING extends React.Component {
    render() {
        return (
            <div style={{
                width: this.props.width || '100vw', height: this.props.height || '100vh',
                float: this.props.float || 'none', marginTop: this.props.marginTop || '0px'
            }}
                className="text-center circle-loading">
                <MuiThemeProvider >
                    <CircularProgress style={{ top: '40%' }} size={60} thickness={7} />
                </MuiThemeProvider>
            </div>
        )
    }
}