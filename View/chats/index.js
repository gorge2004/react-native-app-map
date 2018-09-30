import React , {Component} from 'react';
import { Container, Header, Content, Grid, Row, Col, Left, Body, Right, Icon, Button } from 'native-base';
import ChatItem from './chatItem';

class ChatList extends Component{
    constructor(props){
        super(props);
    }
    render(){
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
                        <Button transparent>
                            <Icon type='Feather' name='settings' style={{color: 'black'}} />
                        </Button>
                    </Right>
                </Header>

                <Content >
                    <Grid>
                        <Row>
                            <Col>
                                <ChatItem onPress ={ () => this.props.navigation.navigate('Chat',{user: 'user'})} />
                                <ChatItem />
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}
export default ChatList;