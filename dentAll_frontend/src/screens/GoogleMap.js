import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';      

class GoogleMap extends Component{                                    
    render(){
        const mapStyles = {
            width: '40%',
            height: '240px',

        };
        return(
            <Map
                google = {this.props.google}
                zoom = {14}
                style = {mapStyles}
                initialCenter = {{lat: 37.7749, lng: -122.4194 }}              
                >
                    <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
                </Map>
        );
      
    }
}

export default GoogleApiWrapper({                                       
    apiKey: 'AIzaSyD3DRNQhCYNtrrmPFSqcQzF1kCZBT8Lp4s',                    
})(GoogleMap);