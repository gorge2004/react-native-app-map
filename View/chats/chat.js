import React, {Component} from 'react';
import {  Header, Content, Footer, Body, Input, Button, Text, Item, Row, Col, Card, CardItem, Icon, Grid,Left, Right } from 'native-base';
import {KeyboardAvoidingView, View,} from 'react-native';
class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {msg:null,chat:[],};
        this.Content ;
        const { navigation } = this.props;
        this.input;
    }
        componentDidMount(){
            const { navigation } = this.props;
            const user = navigation.getParam('user',{uri:null});
            this.setState({user:user})
        }
    send = () => {
        const msg = this.state.msg;
        let chat = this.state.chat;
        const color = '#bbdefb'; //blue lighten-4
        const  date = new Date();
        const hours = this.addZero(date.getHours())+":"+this.addZero(date.getMinutes());
        if(msg){
            chat.push({text: msg,hour:hours,color:color});
            this.setState({chat: chat});
           // this.Content._root.scrollToPosition(0, height, false);
        }
        this.input._root.clear();
        
    }
    addZero = (number) =>{
        if(number<10){
            return "0"+number;
        }
        return number;
    }
    contentChat = () =>{
        const {chat} = this.state;
        const msgs =( chat.length > 0 )? chat.map((text,index) =>   <Row key={index}>
                                                                            <Col>
                                                                                <Card  >
                                                                                    <CardItem style={{backgroundColor:text.color}}>
                                                                                    <Body>
                                                                                        <Text>
                                                                                        {text.text}
                                                                                        </Text>
                                                                                    </Body>
                                                                                    </CardItem>
                                                                                    <CardItem footer style={{backgroundColor:text.color}}>
                                                                                        <Left />
                                                                                        <Body />
                                                                                        <Right>
                                                                                            <Text note>{text.hour}</Text>
                                                                                        </Right>
                                                                                    </CardItem>
                                                                                </Card>
                                                                            </Col>
                                                                        </Row>  ) :<View /> ;
    return msgs;
    }
   
   
    render(){
       
      const msgs = this.contentChat(); 
       
        return(
            <KeyboardAvoidingView  style={{flex:1}} behavior={'padding'} >
                    <Header transparent>
                        <Left >
                            <Button transparent onPress={()=> this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'black'}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Text>{ this.state.user }</Text>
                        </Body>
                        <Right />
                           
                    </Header>
                    <Content ref={ ref => this.Content = ref } onContentSizeChange={()=>  this.Content._root.scrollToEnd()}>
                        <Grid >
                            {msgs }
                        </Grid>
                    </Content>
                    <Footer style={{backgroundColor:'transparent'}}>
                        <Body>
                            <Item rounded>
                                <Input ref={(c) => {this.input = c;}} multiline={true} placeholder=' Type' onChangeText={(txt) =>{ this.setState({msg:txt}) } }/>
                            </Item>
                        </Body>
                        <Button transparent  onPress={this.send}>
                          <Icon name='paper-plane-o' type='FontAwesome'/>
                        </Button>
                    </Footer>
                </KeyboardAvoidingView>   

            
            
        );
    }

}
export default Chat;