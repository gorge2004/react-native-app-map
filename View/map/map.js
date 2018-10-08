import React from 'react';
import { Dimensions,View,Image} from 'react-native';
import { Container, Header, Content, Footer, Icon, Grid, Row, Col, Text, Button, Left, Spinner, Body,Right } from 'native-base';
import { MapView, Permissions, Location, Asset } from 'expo';
import History from './history';
import GestureRecognizer from 'react-native-swipe-gestures';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {coords:{ latitude: 37.78825,
                               longitude: -122.4324, 
                               latitudeDelta: 0.0922,
                               longitudeDelta: 0.0421,},
                      loading: null,
                      permission:{},
                      history:null,
                      markSrc:[],
                      mounted:false
                              };
        this.timeOut;    
        
      }
      async componentDidMount (){
        const permission = await Permissions.askAsync(Permissions.LOCATION);
        this._endHistory();
        this.setState({loading:true,permission:permission,mounted:true}); 
        this.requestMarkSource();      
        this._getRegion();
       
    
      }
      cacheImages = (images)=> {
   
        return Image.prefetch(images);
        //return Asset.fromModule(images).downloadAsync();   
  }
  //get current coords
    _getRegion= async (region)=> {
        let location = await Location.getCurrentPositionAsync({});
        this.changeLocation( location.coords.latitude,location.coords.longitude);
        this.setState({loading:false});
    }

    //request history of the user
    requestMarkSource = () => {
        const marks = [];
        marks.push({type:'public',
                    uri:'https://images.unsplash.com/photo-1538820299736-d1cbeb731a73?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a98872828d0bd41622a4d4d719590b6f&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
                    duration: 10000,
                    media: 'image',
                    lat: 9.73725154052128,
                    long:-63.15504552796483
                });
                marks.push({type:'gift',
                            uri:'https://images.unsplash.com/photo-1538747286412-b1c4759450a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5bee495e222cdaa910ed962a7c9ad5b3&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
                            duration: 10000,
                            media: 'image',
                            lat:9.736774241735446,
                            long:-63.159260619431734
            });
        this.setState({markSrc:marks});
    }
    // set current coords 
    changeLocation = (lat,long) =>{
        this.setState({coords:{ latitude: lat,
        longitude: long, 
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,}});
    }
    loading = () => {
        return <Spinner />;
    } 
    // load map
    map =  () => {
        /**
         * <MapView.Marker coordinate ={{ latitude: this.state.coords.latitude,
                                           longitude: this.state.coords.longitude,}}
            onPress={()=> {this.history({uri:'https://image.shutterstock.com/z/stock-vector-welcome-word-cloud-in-different-languages-concept-background-640112647.jpg',duration:10000})} }
        
            />  
         */
        const marks = this.marks();
        const {height} = Dimensions.get('window');
        return (
        <MapView
            style={{ height: height}}
            region={this.state.coords}
           
        >
             {marks}
        </MapView>
        );
    }
    //open History
    history = (media) =>{
       
        const history =( <GestureRecognizer style={{ position:'absolute' }} onSwipeDown={(state)=> {this._endHistory(); 
                                                                                                     clearTimeout(this.timeOut);
                                                                                                    }
                                                                                        }
                          >
                            <History media={media.uri} duration={media.duration} />
                        </GestureRecognizer>);
        this.setState({history: history});

        this.timeOut = setTimeout(()=>{this._endHistory();},(media.duration+2000));
    }

    //close history
    _endHistory = ()=>{
        this.setState({history:null});
    }
    //load marks to map
    marks = () =>{
        const {markSrc} = this.state;
        const marks =  markSrc.map(
            (mark,index )=>{
                
                return(  <MapView.Marker key={index} coordinate ={{ latitude: (mark.lat ),
                                                       longitude: (mark.long ),}}
                    onPress={()=> {this.history({uri: mark.uri, duration: mark.duration})} }
    
                />); 
            }
        );
        
        return  marks;
    }
    componentWillUnmount(){
        this.setState({mounted:false});
        clearTimeout(this.timeOut);
        this._endHistory();
       
        
    }
    render(){
        let content ;
     
        if(this.state.mounted){
            if(this.state.permission.status === 'granted' ){
                content = this.state.loading ? this.loading() : this.map();
   
           } else {
               content = ( <View>
                               <Text>there is not permission gps</Text>
                           </View>);
           }
            return (
                <Container>
                   <Header transparent>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'black'}}/>
                            </Button>
                        </Left>
                        <Body />
                        <Right />
                    </Header>
                 
    
                  <Content >
                    <Grid>
                      <Row>
                        <Col>
                             {content}
                        </Col>
                      </Row>
                    </Grid>
                  
                  </Content>
                    
                  {this.state.history}
                  <Footer />         
                </Container>      
            ); 
        }
        return <View />


    }
}
export default Map;