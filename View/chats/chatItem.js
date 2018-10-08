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
                            <Thumbnail source={this.props.img}/>
                        </Left>
                        <Body>
                            <Text>{this.props.Username}</Text>
                            <Text note>{this.props.message}</Text>
                        </Body>
                        <Right>
                            <Text note> {this.props.time}</Text>
                        </Right>
                    </ListItem>
                </List>
        );
    }
}
export default ChatItem;