import React, {Component} from 'react';
import { Container, Footer, Content, Icon, Body, Header, Grid, Row, Right, Left, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, TouchableWithoutFeedback, AsyncStorage, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../../assets/styles/style';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


import {Camera, Permissions } from 'expo';
class CameraApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            user:{}

        };
        this.camera;
        _isMounted = false;
        this.circularProgress;

        //----------------------------------------
        this.interval, this.actionClick,this.video=false;
    }
    static navigationOptions = {
        header: null,
        }; 

   async componentDidMount (){
        this._isMounted = true; 
        this.permissions();
        let user  = await AsyncStorage.getItem('user');
        user = eval("("+user+")") ;
        this.setState({user: user});

    }

    permissions = async () =>{
        if(this._isMounted ){      
            try {
                await Permissions.askAsync(Permissions.CAMERA);
                await Permissions.askAsync(Permissions.AUDIO_RECORDING);
                const check = await Permissions.getAsync(Permissions.CAMERA);
                this.setState({hasCameraPermission: check.status});
            } catch (error) {
                    console.error(error);    
                }
        }
            

    }
    // from back to from camera and reverse
    switchCamera = async () => {
        if(this._isMounted){
            this.setState({
                type:  (this.state.type == Camera.Constants.Type.back) ? Camera.Constants.Type.front : Camera.Constants.Type.back,
            });
            //logout, pratice
            await AsyncStorage.clear();
         }
        
    }
    snap = async () => {
        if(this._isMounted ){ 
            if (this.camera) {
                let photo = await this.camera.takePictureAsync();
                this.redirect(photo);
            }
        }
      };
    componentWillUnmount() {
        this._isMounted = false
    }
    _onSwipeUp = (state) =>{
        alert("Up")
    }
    _onSwipeDown = (state) =>{ 
        this.props.navigation.navigate('MainChat');
    }
//-----------------------------------------------------------------------------------------------------------
      record = async() => {
        this.actionClick = 'video';
        console.log("start video");
        this.circularProgress.animate(100, 15000); 
        const video = await this.camera.recordAsync({maxDuration: 15});
        this.redirect(video);
      }
      _pressIn = () =>{
        console.log("inside PressIn ");
        this.interval = setTimeout(this.record,1000);
        this.actionClick = 'photo';
      }
      
      stopRecord= () =>{
        console.log("inside PressOut");
        this.circularProgress.animate(0,0);

        clearTimeout(this.interval);
        switch (this.actionClick) {
            case 'video':
                    console.log("stop video");
                    this.camera.stopRecording();
                break;
                case 'photo':
                    console.log("photo");
                    this.snap();
                break;
        }                
      }
//-----------------------------------------------------------------------------------     
      redirect = (photo) =>{
        this.props.navigation.navigate('previewImage',{image: photo,type:this.actionClick});
      }
    render(){
        const {hasCameraPermission} = this.state;
        console.log("user camera ",this.state.user.token ? this.state.user.token : 'none');
       const profileImage = this.state.user.image ? this.state.user.image  : require('../../assets/Images/no.image.png');

        let display; 
                if(hasCameraPermission == 'granted'){
                    display =
                (<GestureRecognizer style={{flex:1}} onSwipeUp={ (state)=> this._onSwipeUp(state) } onSwipeDown={ (state) => this._onSwipeDown(state)}>
                    <Camera ref={ref => {this.camera = ref}} style={{flex: 1}} type={this.state.type}>
                        <Content style={Styles.transparent}>
                            <Grid style={Styles.transparent}>
                                    <Row style={Styles.transparent}>
                                        <Body>
                                        
                                        </Body> 
                                    </Row>
                            </Grid>
                        </Content>
                        <Footer style={[Styles.transparent,Styles.footer]} >
                            <Left />
                            <Body transparent style={[Styles.center,{width:100,height:100}]} >
                                <TouchableOpacity  style={[Styles.button,Styles.center]}
                                                    onPressIn={ () => this._pressIn() }
                                                    onPressOut={() => this.stopRecord()}        
                                >
                                    <AnimatedCircularProgress
                                        ref={(ref) => this.circularProgress = ref}
                                        size={100}
                                        width={5}
                                        fill={0}
                                        rotation={0}
                                        prefill={0}
                                        tintColor='#f00a'
                                        children={()=>(<Icon name="camera" />)}
                                    />
                                </TouchableOpacity>
                                
                            </Body>
                            <Right style={[Styles.center,Styles.buttonSmall]} >
                                <TouchableWithoutFeedback style={[Styles.center,Styles.buttonSmall]} onPress={this.switchCamera} >
                                    <Icon name="ios-reverse-camera"  type='Ionicons'  style={{color:'#fff'}}/>
                                </TouchableWithoutFeedback>
                            </Right>
                        </Footer>        
                    </Camera> 
                </GestureRecognizer>);
                }else if (hasCameraPermission == 'denied'){
                    display = (<View style={Styles.center}><Text>No access to camera</Text></View>)
                }else{

                    display = <View />
                }         
        return (
            <Container >
                <Header >
                    <Left>
                        <Thumbnail  source={profileImage} />
                    </Left>
                    <Body />
                    <Right />
                </Header>
                 {this._isMounted ? display : <View /> }
            </Container>

        );
    }
}
export default CameraApp;