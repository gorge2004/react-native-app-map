import React, {Component} from 'react';
import { KeyboardAvoidingView, Keyboard, View} from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Input, Footer, FooterTab, Form, Item, H3 } from 'native-base';


export default class Send extends Component {
    constructor(props){
        super(props);
        this.openKeyboard ;
        this.state = {button:null};
        this._mounted = false,   this.openKeyboard,this.closeKeyboard;
        

    }
    componentDidMount(){
        this._mounted = true;
        this._hideKeyboard();
        this.openKeyboard = Keyboard.addListener('keyboardDidShow',this._showKeyboard);
        this.closeKeyboard = Keyboard.addListener('keyboardDidHide', this._hideKeyboard);
    }
    body = () => {
        switch (this.props.type) {
            case 'public':
                return (
                        <Item>
                            <Input placeholder='title' onChangeText={this.props.onTitle}/>
                        </Item>
                        );
                break;
                case 'gift':
                case 'direct':
                return (<View>
                        <Item>
                            <Input placeholder='title' onChangeText={this.props.onTitle}/>
                        </Item>
                        <Item>
                            <Input placeholder='Select Friends' onChangeText={this.props.onFriend} />
                        </Item>
                        </View> );
                break;
        
          
        }
    }

    componentWillUnMount(){
        this._mounted = false;
        this.openKeyboard.remove();
        this.closeKeyboard.remove();
    }
    footer = () => {
        return  (<Footer >
            <FooterTab>
                <Button primary onPress={ this.props.post}>
                    <Icon type='FontAwesome' name='send-o'/>
                </Button>
            </FooterTab>
        </Footer>);
    }
    _showKeyboard= () =>{
        if(this._mounted){
            this.setState({button:null});
        }
    } 
    _hideKeyboard = () =>{
        if(this._mounted){
            this.setState({button: this.footer() })
        }
    }
    render(){
        const content = this.body();
        
        if(this._mounted){
            return( 

                <KeyboardAvoidingView behavior='padding' style={{position: 'absolute',bottom: 55, zIndex:1,height:'60%',width:'80%', marginLeft: '10%'}}>
                        <Container>
                            <Header  >
                                <Left />
                                <Body >
                                    <H3>
                                        {this.props.type}
                                    </H3>
                                </Body>
                                <Right >
                                    <Button transparent onPress={ () => {
                                                                            this._mounted = false ;
                                                                            this.props.onClose();
                                                                         }  }>
                                       <Icon type='MaterialIcons' name='close' />
                                    </Button>
                                </Right>
                            </Header>
                                
                            <Content>
                                <Form>
                                      {content}          
                                </Form>
                            </Content>

                          {this.state.button}
                        </Container>
                    </KeyboardAvoidingView>
            );
        }
        else {
            return <View />
        }
 
    }
}