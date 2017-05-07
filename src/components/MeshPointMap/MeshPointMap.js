import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => (

    <div>
        <img src='/car2go_logo.jpg' style={{height: '32px', width: '32px'}} />
        {text}
    </div>
)

// https://github.com/istarkov/google-map-react

export default class MeshPointMap extends Component {

    static defaultProps = {
        center: { lat: 30.247203, lng: -97.7941559 },
        zoom: 11
    };

    render() {
        return (
            <div style={{ height: '500px' }}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={30.2672}
                        lng={-97.7431}
                        text={'Alice'}
                    />

                    <AnyReactComponent
                        lat={30.2672}
                        lng={-97.8431}
                        text={'Bob'}
                    />
                </GoogleMapReact>
            </div>
        )
    }
}
