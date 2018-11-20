import React, {Component} from 'react';
import Styles from '../../assets/styles/style';
import {  Spinner  } from 'native-base';
import {View, AsyncStorage} from 'react-native';
class Loading extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.validateUser();

    }
    validateUser = async() => {
        let user  = await AsyncStorage.getItem('user');
        if(user){
            user = eval("("+user+")") ;
            const token = user.token;
            this.props.navigation.navigate( token ? 'AuthApp' : 'Login');
        }else{
            this.props.navigation.navigate('Login');

        }
     

    } 
    render(){
        return (<View style={Styles.center}>       
            <Spinner color='green' />    
        </View>);
    } 
}
export default Loading;