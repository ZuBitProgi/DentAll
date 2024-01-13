import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';   
import HoteliLista from './Index/HoteliLista';  

class GoogleMap extends Component{                                    
    render(){
        const mapStyles = {
            width: '45%',
            height: '400px',

        };
        return(
            <Map
                google = {this.props.google}
                zoom = {14}
                style = {mapStyles}
                initialCenter = {{lat: 37.7749, lng: -122.4194 }}              
                >
                    {hotelLocations.map(location => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            label={location.name}
          />
        ))}
                </Map>
        );
      
    }
}

export default GoogleApiWrapper({                                       
    apiKey: 'AIzaSyD3DRNQhCYNtrrmPFSqcQzF1kCZBT8Lp4s',                    
})(GoogleMap);