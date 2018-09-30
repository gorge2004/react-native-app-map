import React, {Component} from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text, Right } from 'native-base';
import {Alert} from 'react-native';

class ChatItem extends Component {
    constructor(props){
        super(props);
    }
    _openChat(){
       
    }
    render(){
        
        return (
                <List >
                    <ListItem  thumbnail button={true} onPress={ this.props.onPress }>
                        <Left>
                            <Thumbnail source={require('../../assets/Images/user-profile.png')}/>
                        </Left>
                        <Body>
                            <Text> USername</Text>
                            <Text note>sadadaadas</Text>
                        </Body>
                        <Right>
                            <Text note>4:45 pm</Text>
                        </Right>
                    </ListItem>
                </List>
        );
    }
}
export default ChatItem;