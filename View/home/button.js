import React, {Component} from 'react';
import { Button, Text,Row, Icon } from 'native-base';
//components
import Styles from '../../assets/styles/style';
 function button (props){
    
     return (
     <Row style={Styles.center}>    
        <Button iconLeft dark onPress={ props.onPress } >
            <Icon type={props.type} name={props.icon} />
            <Text>{props.msg}</Text>
        </Button>
    </Row>);
 }
 export default button;