import React, {Component} from 'react';
import {Container, Body, Grid, Col, Row, Content, Header, Title, Toast, Spinner} from 'native-base';
import {Image, View, AsyncStorage} from 'react-native';
//components
import Styles from '../../assets/styles/style';
import Button from './button';
import Login from './form';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {  login: false,
                        Title:'',
                         user:{},
                         forgetPsw:true,
                         methodLogin: null,
                        loading: false};
        this.forgetPsw ;
        _isMounted = false;

    }
    static navigationOptions = {
        header: null,
        };

        componentDidMount(){
            this._isMounted = true;
        }
    //click 
    handlePress = (id) =>{
        this.setState(  (prevState) => {    
                                return {login:!prevState.login};

        });
        this.selectMethodPost(id);
        
    }
    //switch with select method 
    selectMethodPost = (id) =>{
        let msg,psw, method ;
        switch (id) {
            case 'login':
                msg='Login';
                psw = true;
                method = () => this.login();
                break;
            case 'fb':
                msg='Login with Facebook';
                psw = true;

            break;
            case 'mail':
                msg = 'Register with Email';
                psw = null;
                break;
            case 'back':
                msg = '';
            break;   
        }
        this.forgetPsw = psw;
        this.setState({Title: msg,methodLogin:method});
        console.log(id);
    }
    // return botton main view
    buttons = () => {
        return ( <View>
                    <Button  msg='Login' type='Entypo' icon='user' onPress={ () => this.handlePress('login')} />
                    <Button  msg='Login with Facebook' type='Entypo' icon='facebook-with-circle' onPress={ () => this.handlePress('fb')} />
                    <Button  msg='Sign In with email' type='MaterialCommunityIcons' icon='gmail' onPress={ () => this.handlePress('mail')} />
                </View>);

    }
    //return form component
    form = () => {
        return ( <Login post={this.state.methodLogin} register={this.forgetPsw} onChangeUser={(txt) => this.onChangeUser(txt)} onChangePsw={(txt) => this.onChangePsw(txt)}  onBack={ () => this.handlePress('back')} /> );
    }
    onChangeUser = (txt) =>{
        this.state.user.email =  txt;        
    }
    onChangePsw = (txt) => {
        this.state.user.password = txt ;
    }
    //login with email
    login = async () => {
       const post = this.postLogin();
       let json = {} ;
       if(this._isMounted){
            if(post){
                //show Spinner
                this.setState({loading: true});
                try {
                    const response = await fetch('https://reqres.in/api/login',{
                        method: 'POST',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.state.user),
                    
                    });
                    json = await response.json(); 
                } catch (error) {
                    console.error(error);
                    
                    }
                    //hide spinner
                this.setState({loading: false});
                //validate auth and redirect
                this.redirect(json);
            }
       }
             
    }
    //redirect auth
    redirect = async(authJson) =>{
        if(this._isMounted){
            if(authJson.token){
                await AsyncStorage.setItem('user',JSON.stringify(authJson));
                this.notification('Welcome');
                this.props.navigation.navigate('AuthLoading');            

            }else{
                this.notification('wrong UserName/Password');

            }
        }
    }
    //check if there is a empty field 
    postLogin = () =>{
        const {user} = this.state ;
        if(user.email && user.password){
            return true;
        }
        this.notification("Empty field");
        return false;
    }
    //alert to screen
    notification = (txt) => {
        Toast.show({text: txt,
                    buttonText: 'Ok'});
    }
    componentWillUnmount() {
        this._isMounted = false
      }

    render(){
        const login = this.state.login ? this.form() :  this.buttons();
        return (
                <Container style={Styles.amberDarken3} padder>
                    <Header style={Styles.amberDarken3} />
                    <Content >
                        <Grid>
                            <Row>
                                <Body>
                                    <Image style={Styles.logo}  source={require('../../assets/Images/logo.png')}/>                           
                                </Body>
                            </Row>
                            <Row>
                                <Body>
                                   { this.state.loading ?<Spinner color='green' /> :<Title>{this.state.Title}</Title>}
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
        );
    }
}
export default Home;