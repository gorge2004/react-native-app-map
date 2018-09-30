import React, {Component} from 'react';
import {Constants, Permissions, Location, MapView} from 'expo';
import { Container, Content, Text, Grid, Row, Col } from 'native-base';
import {Platform} from 'react-native';
import  Styles from '../../assets/styles/style';

class Maps extends Component {
    state = {
        location: null,
        errorMessage:null,
    };
    componentWillMount(){
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
              errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
          } else {
            this._getLocationAsync();
          }
    }
    _getLocationAsync = async () =>{
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if( status !== 'granted'){
            this.setState({errorMessage: "Permission denied"});
        }
        let location = await Location.getCurrentPositionAsync({});
        //await Location.getProviderStatusAsync()
        
        this.setState({location});
    }
    _up7 = (coord) =>{
        const string = coord.toString();
        const end = string[0]==='-' ? 9 : 8;
        const num = parseFloat(string.slice(0,end));
        console.log(num);
        
        return  num;
        
    } 
    render(){
        let text = 'waiting';
       
        let map = null;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
          } else if (this.state.location) {
            const lat = this.state.location.coords.latitude ;
            const long = this.state.location.coords.longitude;
           const  Mylocation = {latitude:lat,longitude:long,latitudeDelta:0.001,longitudeDelta:0.005};

            map = <MapView style={Styles.fullScreen}  initialRegion={Mylocation} /> 
          }
          
         
      
                            
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>
                            <Col>
                               {map}         
                            </Col>
                        </Row>
                    </Grid>
                    
                </Content>
            </Container>
        ) ;
    }
}
export default Maps;