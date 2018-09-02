import React, {Component} from 'react';
import {Container, Body, Grid, Col, Row, Left, Content, Text, Header, Root, H1, Title} from 'native-base';
import {Image, View} from 'react-native';
//components
import Styles from '../../assets/styles/style';
import Button from './button';
import Login from './form';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {login: false,Title:''};
    
    }
    handlePress = (id) =>{
        this.setState(  (prevState) => {    
                                return {login:!prevState.login};

        });
        let msg ;
        switch (id) {
            case 'login':
                msg='Login';
                break;
            case 'fb':
                msg='Login with Facebook';
            break;
            case 'mail':
                msg = 'Login with Email';
                break;
            case 'back':
                msg = '';
            break;   
        }
        this.setState({Title: msg});
        console.log(id);
        
    }
    buttons = () => {
        return ( <View>
                    <Button  msg='Login' type='Entypo' icon='user' onPress={ () => this.handlePress('login')} />
                    <Button  msg='Login with Facebook' type='Entypo' icon='facebook-with-circle' onPress={ () => this.handlePress('fb')} />
                    <Button  msg='Sign In with email' type='MaterialCommunityIcons' icon='gmail' onPress={ () => this.handlePress('mail')} />
                </View>);

    }
    form = () => {
        return ( <Login  onBack={ () => this.handlePress('back')} /> );
    }
    render(){
        const login = this.state.login ? this.form() :  this.buttons();
        return (
            <Root>
                <Container style={Styles.blueDarken4} padder>
                    <Header style={Styles.blueDarken4} />
                    <Content >
                        <Grid>
                            <Row>
                                <Body>
                                    <Image style={Styles.logo}  source={require('../../assets/Images/logo.png')}/>                           
                                </Body>
                            </Row>
                            <Row>
                                <Body>
                                    <Title>{this.state.Title}</Title>
                                </Body>
                            </Row>
                            <Row >
                                <Col>
                                    {login}
                                </Col>
                            </Row>
                            
                        </Grid>
                      
                        
                    </Content>
               
                </Container>
            </Root>
        );
    }
}
export default Home;