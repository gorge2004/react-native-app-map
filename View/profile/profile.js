import React, {Component} from 'react';
import { Container, Header, Content, Body, Footer, Grid, Row, Button , Text, Col, Icon, Fab, Left, Right } from 'native-base';
import {Image,  View, TouchableWithoutFeedback , Share ,Platform, AsyncStorage} from 'react-native';
import { ImagePicker } from 'expo';


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {user:{},imgProfile:{},Version:null,active:false,url:{ios: 'https://www.google.com/',android: 'https://www.google.com/'}};
    }
   async componentDidMount(){
            let user  = await AsyncStorage.getItem('user');
            user = eval("("+user+")") ;
            this.setState({user: user});
            if(this.state.user.image){
                this.setState({imgProfile:{uri:this.state.user.image } });
            }else{
                this.setState({imgProfile: false});
            }
            
            this.setState({Version:'1.0'});

    }
    _changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: 'Images'
          });
          if(!result.cancelled){
            this.setState({imgProfile: {uri:result.uri}});
          }
          console.log(result," state ", this.state.ImgProfile);
          
    }
    _logout= async () =>{
            //logout, pratice
        await AsyncStorage.clear();
        this.props.navigation.navigate("AuthLoading");
    } 
    share = () =>{
        const os =
        Platform.select({ios: {
                                message: 'Hey there, You run to download MAPSCAT, it is great!!',
                                url: this.state.url.ios,
                                title: 'MAPSCAT AWESOME'
                              },
                         android:  {
                            message: 'Hey there, You run to download MAPSCAT, it is great!! '+this.state.url.android,
                            title: 'MAPSCAT AWESOME'
                          }});
        console.log(os);
        
        Share.share(os, {
            // Android only:
            dialogTitle: 'MAPSCAT',
            
          })
    }
    render(){ 
            const uri = this.state.imgProfile ? this.state.imgProfile : require('../../assets/Images/no.image.png');
        return(
            <Container>
                <Header transparent>
                    <Left >
                        <Button transparent onPress={()=> this.props.navigation.goBack()}>
                            <Icon name='arrow-back' style={{color: 'black'}}/>
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content >
                    <Grid>
                        <Row>
                            <Body>
                                <View  style={{width:200,height:200, borderWidth:2, borderRadius: 100,alignItems:"center",alignContent:"center",flexDirection:'row'}} >
                                    <TouchableWithoutFeedback onPress={this._changeImage}>
                                        <Image style={{width:'100%',height:'100%', borderRadius:100}} source={uri} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </Body>
                        </Row>
                        <Row>
                            <Col style={{
                                    alignItems:"center",
                                    alignContent:"center"
                                }}
                            >
                            <View>
                                <Text note>
                                    User
                                </Text></View>
                            </Col>
                        </Row>
                        <Row>
                            <Col  style={{
                                    alignItems:"center",
                                    alignContent:"center"
                                }}
                            >
                                <View style={{margin:10, width:200}}>
                                    <Button iconLeft full>
                                        <Icon type='Feather' name='user' />
                                        <Text>Change UserName</Text>
                                    </Button>  
                                </View>      
                            </Col>    
                        </Row>
                        <Row>
                            <Col  style={{
                                    alignItems:"center",
                                    alignContent:"center"
                                }}
                            >
                                <View style={{margin:10, width:200}}>
                                    <Button iconLeft  full>
                                        <Icon type='Ionicons' name='md-contacts' />
                                        <Text>Friends List</Text>
                                    </Button>  
                                </View>      
                            </Col>    
                        </Row>
                        <Row>
                            <Col  style={{
                                    alignItems:"center",
                                    alignContent:"center"
                                }}
                            >
                                <View style={{margin:10, width:200}}>
                                    <Button iconLeft  full >
                                        <Icon type='MaterialIcons' name='lock-outline' />
                                        <Text>Change password</Text>
                                    </Button>  
                                </View>      
                            </Col>    
                        </Row>
                        <Row>
                            <Col  style={{
                                    alignItems:"center",
                                    alignContent:"center"
                                }}
                            >
                                <View style={{margin:10, width:200}}>
                                    <Button iconLeft  full onPress={this._logout}>
                                        <Icon type='MaterialCommunityIcons' name='logout' />
                                        <Text>Logout</Text>
                                    </Button>  
                                </View>      
                            </Col>    
                        </Row>

                    </Grid>
                    
                </Content>
                <View>
                     <Fab
                        active
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={this.share}
                    >
                                <Icon name="share" />
                                
                     </Fab>
                </View>
                <Footer style={{backgroundColor: 'transparent'}} >
                    <Text note> Version {this.state.Version}</Text>
                </Footer>
            </Container>
        );
    }
}
export default Profile;