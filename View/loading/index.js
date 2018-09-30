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
        user = eval("("+user+")") ;
        this.props.navigation.navigate(user.token ? 'AuthApp' : 'Login');
    } 
    render(){
        return (<View style={Styles.center}>       
            <Spinner color='green' />    
        </View>);
    } 
}
export default Loading;