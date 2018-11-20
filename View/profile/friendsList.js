import React, {Component} from 'react';
import { Container,  Footer, Grid, Col, Text, Row, Item, ListItem, Left, Body, Right, Button, Thumbnail, Icon, Input } from 'native-base';
import {FlatList} from 'react-native';
export default class FriendsList extends Component {
    constructor(props){
        super(props);
        this.state = {dataFriends:[],friends:[]};
    }
  
async componentWillMount(){
    this.getFriends().then((json) => { this.setState({dataFriends:json}); this.setFriends(json); });
    
}
    getFriends = async () =>{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const json  = await response.json();
        return json;
    }
    setFriends = (friends) =>{
        this.setState({friends:friends});
    }
     itemFriend = (friend) => {
         
         return (
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../assets/Images/logo.png')} />
                            </Left>
                            <Body>
                                <Text>
                                 {friend.item.name}
                                </Text>
                                <Text note>
                                    {friend.item.username}
                                </Text>
                            </Body>
                            <Right>
                                <Button transparent bordered onPress={()=> alert("unfollow "+friend.item.email)}> 
                                    <Text>
                                        Following
                                    </Text>
                                </Button>
                            </Right>
                        </ListItem>
                );
     }
renderHeaderList = () => {
    return (
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" onChangeText={this.search} />
                <Icon name="ios-people" />
            </Item>
    );

}

search = (txt)=>{
    
    const size = txt.length;
    const arrayData = this.state.dataFriends;
    let result = [];
    
    if(size>0){
        
        result = arrayData.filter((aux)=> { return this.matchString(aux,txt) });         
        this.setFriends(result);
    }else if(size == 0) {
        this.setFriends(this.state.dataFriends);
    }


   
}
matchString = ( data,searching) =>{
    
    const match = data.name.toUpperCase().indexOf(searching.toUpperCase())>=0 || data.username.toUpperCase().indexOf(searching.toUpperCase())>=0; 
    return  match;
    
}
emptyList = () => {
    return <Text>No found</Text>;
}

    render(){
        return (
                <Container>
                   
                    <Grid>
                        <Row>
                            <Col>
                                <FlatList
                                    data={this.state.friends}
                                    renderItem={ (item) => this.itemFriend(item) }
                                    keyExtractor={(item, index)=> index.toString()}
                                    ListHeaderComponent={this.renderHeaderList}
                                    ListEmptyComponent={this.emptyList}

                                />
                            </Col>
                        </Row>
                    </Grid>
                    <Footer />
                </Container>
        );
    }
}