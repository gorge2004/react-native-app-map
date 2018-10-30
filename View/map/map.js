import React from 'react';
import { Dimensions,View,Image, Animated, Easing} from 'react-native';
import { Container, Header, Content, Footer, Icon, Grid, Row, Col, Text, Button, Left, Spinner, Body,Right, Fab } from 'native-base';
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
                      active: false
                     
                              };
        this.mounted = false;
        this. repeat = true ;
        this.opacity = new Animated.Value(0);
        this.timeOut, this.markSrc = [] ;    
        
      }
      async componentDidMount (){
        const permission = await Permissions.askAsync(Permissions.LOCATION);
        this._endHistory();
        this.mounted = true;
        this.setState({loading:true,permission:permission}); 
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
                            uri:'https://images.unsplash.com/photo-1540778930632-ac8ee7468936?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b4ae271f29592f4a48c94c4cc0b422ae&w=1000&q=80',
                            duration: 10000,
                            media: 'image',
                            lat:9.736774241735446,
                            long:-63.159260619431734
            });
            marks.push({type:'public',
            uri:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            duration: 10000,
            media: 'video',
            lat: 8.875401750024592,
            long:-64.22986032441258
        });
            this.markSrc = marks ;
    }
    //delta latitud
    deltLat = (lat) => {
        let greater = 0 ;
        for (let index = 0; index < this.markSrc.length; index++) {
            const element = this.markSrc[index].lat;
            const aux = Math.abs(element - lat );
            if(aux>greater){
                greater = aux;
            }
            
        }
        return (greater * 2);
        
     }
     //delta longitud
     deltLong = (long) => {
        let greater = 0 ;
        for (let index = 0; index < this.markSrc.length; index++) {
            const element = this.markSrc[index].long;
            const aux = Math.abs(element - long );
            if(aux>greater){
                greater = aux;
            }
            
        }
        return (greater * 2.2);
        
     }
    // set current coords 
    changeLocation = (lat,long) =>{
       const deltaLat = this.deltLat(lat);
       const deltaLong = this.deltLong(long);

        this.setState({coords:{ latitude: lat,
        longitude: long, 
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLong,}});
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
            initialRegion={this.state.coords}
            showsUserLocation={true}
            loadingEnabled={true}
        >
             {marks}
        </MapView>
        );
    }
    //open History
    history = async (media) =>{
        this.repeat = true;  
        this.startAnimated();
        const asset =  await this._loadedAssets(media);        
        this.stopAnimation();
        media.uri = asset ? asset: media.uri;
        
        const history =( <GestureRecognizer style={{ position:'absolute' }} onSwipeDown={(state)=> {this._endHistory(); 
                                                                                                    }
                                                                                        }
                          >
                            <History loaded={() => {this.closeTime(media.duration);}} media={media.uri} duration={media.duration} type={media.type} />
                        </GestureRecognizer>);
        this.setState({history: history});
        
    }
    //time out
    closeTime = (time) =>{
        this.timeOut = setTimeout(()=>{this._endHistory();},(time));
    }
    //close history
    _endHistory = ()=>{
        clearTimeout(this.timeOut);
        this.setState({history:null});
    }
    //load marks to map
    marks = () =>{
        const markSrc = this.markSrc;
        const marks =  markSrc.map(
            (mark,index )=>{
                
                return(  <MapView.Marker key={index} coordinate ={{ latitude: (mark.lat ),
                                                       longitude: (mark.long ),}}
                    onPress={()=> {this.history({uri: mark.uri, duration: mark.duration, type: mark.media})} }
    
                />); 
            }
        );
        
        return  marks;
    }
    // button floating
    fabActive= () => {
        this.setState((prevState)=>{ return {active: !prevState.active}} );
    }
    //load asset 
    _loadedAssets =  async (media) => {
        
        if(media.type == 'image'){
            const img =  Image.prefetch(media.uri); 
        
            
           await Promise.all([...img]);
            return  null;
        }else if (media.type == 'video'){
            const uri = media.uri;
            const positionNameFile =  uri.lastIndexOf("/");
            const fileName = uri.slice((positionNameFile+1));     
            const video = await Expo.FileSystem.downloadAsync(uri, Expo.FileSystem.cacheDirectory+''+fileName);
            return video.uri;
        }
       
        
      }
      startAnimated = () => {
        this.opacity.setValue(0);
        Animated.timing(
            this.opacity,
            {
                toValue:1,
                duration: 3000,
                easing: Easing.circle
            }
        ).start( () => this.repeatAnimation() );
    }
    repeatAnimation = () => {
        if (this.repeat){
            return this.startAnimated();
        }
        return ;
    }
     stopAnimation = () => {
         this.repeat = false;
        this.opacity.stopAnimation((value)=> {} ); 
        this.opacity.setValue(0);

     }
    componentWillUnmount(){
        this.mounted = false;
        clearTimeout(this.timeOut);
        this._endHistory();
       
        
    }
    render(){
        let content ;
        const opacity = this.opacity.interpolate({inputRange: [0,1],
            outputRange: [0,1]});

        if(this.mounted){
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
                        <Right >
                            <Animated.View  style ={{opacity}}>
                                <Button transparent rounded >
                                    <Icon style={{ color: 'black'}} type='MaterialCommunityIcons' name='download' />
                                </Button>
                            </Animated.View>
                        </Right>
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
                    <View 
                     >
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{ zIndex:1 }}
                            style={{ backgroundColor: '#5067FF'}}
                            position="bottomRight"
                            onPress={()=>  this.fabActive()}
                            
                        >
                            <Icon type='Entypo' name="dots-three-vertical" />
                            <Button>
                                <Text>1</Text>
                            </Button>
                            <Button>
                                <Text>2</Text>
                            </Button>
                            <Button>
                                <Text>3</Text>
                            </Button>
                            <Button>
                                <Text>4</Text>
                            </Button>
                                    
                     </Fab>
                    </View>
                  {this.state.history}
                  <Footer />         
                </Container>      
            ); 
        }
        return <View />


    }
}
export default Map;