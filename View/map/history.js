import React, {Component} from 'react';
import { View, Animated, Image, Dimensions, Easing, Text} from 'react-native';
import { Header, Left, Body, Right, Container, Content, Footer } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class History extends Component {
     constructor(props){
         super(props);
         this.height = new Animated.Value(0);
         this.width = new Animated.Value(0);
         this.circularProgress;
     }
     componentDidMount(){
        
        this.timing();
     }
     timing = () => {
        this.height.setValue(0); 
        this.width.setValue(0);
        const createAnimation = function(Value,duration,easing,delay=0){
            return Animated.timing(
                Value,
                {toValue:1,
                  duration,
                  easing,
                delay}
            );

        }
        Animated.parallel([
            createAnimation(this.width, 1000, Easing.linear),
            createAnimation(this.height, 1000, Easing.linear,),

        ]).start(()=>{this.circularProgress.animate(100, this.props.duration);});

     }

     render(){
        const {height, width} = Dimensions.get('window');  
        const fullWidth = this.width.interpolate({ inputRange: [0,1], outputRange: [0,width] });
        const fullHeight = this.height.interpolate( {inputRange: [0,1], outputRange: [0,height]} );  
         return(
                <Container style={{backgroundColor:'#000',position:'absolute',zIndex:3}}>   
                    <Animated.View  style={{height:fullHeight,width:fullWidth, alignContent:"center",justifyContent:'center'}} >
                        <Header transparent >
                            <Left>
                                <AnimatedCircularProgress
                                ref={(ref) => this.circularProgress = ref}
                                size={30}
                                width={5}
                                rotation={0}
                                fill={0}
                                prefill={0}
                                tintColor='#00f'
                            
                                />
                            </Left>
                            <Body />                    
                            <Right />
                        </Header>
                        <Image source={{uri: this.props.media}}  style={{width:width,flex:1}} resizeMode='stretch' />
                    </Animated.View>
                 
                   
                </Container>
            
         );
     }
}