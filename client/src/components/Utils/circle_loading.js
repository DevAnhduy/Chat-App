import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from '../../assets/logo-2x.png';
import './circle_loading.scss';

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

export class CIRCLE_LOADING_WITH_LOGO extends React.Component {
    render() {
       return (
            <div className="preloader">
                <img src={Logo} />
                <p className="lead font-weight-bold text-muted my-5" >Đang tải. Chờ xíu ngen....</p>
                <div className="text-center circle-loading">
                   <MuiThemeProvider >
                       <CircularProgress size={this.props.size||40} thickness={this.props.thickness||7} />
                   </MuiThemeProvider>
                </div>
            </div>
       ) 
    }
}