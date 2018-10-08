import React , {Component} from 'react';
import { Container, Header, Content, Grid, Row, Col, Left, Body, Right, Icon, Button } from 'native-base';
import ChatItem from './chatItem';

class ChatList extends Component{
    constructor(props){
        super(props);
    }
    getChat = ()=>{
        const json = [{Username:' Username 1',
                       lastMessage:'hdasdasdjasdsad a das',
                       timeMessage: '3:45 pm',
                       image: require('../../assets/Images/user-profile.png'),
                    },{Username:' Username 2',
                    lastMessage:'hdasdasdsa',
                    timeMessage: '3:30 pm',
                    image: require('../../assets/Images/user-profile.png'),
                 }];
        const chats = json.map((json,id)=> <ChatItem key={id} Username={json.Username} time={json.timeMessage} message={json.lastMessage} img={json.image} onPress ={ () => this.props.navigation.navigate('Chat',{user: 'user'})} />);
        return chats;
    }
    render(){
        const chats = this.getChat();
        return(
            <Container>
                <Header  transparent>
                    <Left >
                        <Button transparent onPress={()=> this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: 'black'}}/>
                        </Button>
                    </Left>
                    <Body />
                    <Right >
                        <Button transparent>
                            <Icon name='add' style={{color: 'black'}}/>
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
                            <Icon type='Feather' name='settings' style={{color: 'black'}} />
                        </Button>
                    </Right>
                </Header>

                <Content >
                    <Grid>
                        
                        <Row>
                            <Col>
                                {chats}
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}
export default ChatList;