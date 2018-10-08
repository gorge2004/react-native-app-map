import React ,{Component} from 'react';
import { Container, Header, Content, Left, Button, Icon, Body, Right, Grid, Row, Col, Footer,Text, FooterTab} from 'native-base';
import  Styles from '../../assets/styles/style';
import {Image, TouchableOpacity }from 'react-native';
import Video from './video';
import {ImageManipulator } from 'expo';


class Preview extends Component {
    constructor(props){
        super(props);
        this.state = {header:null,imageShow:{},imageOriginal:{}};
        this.counter = 0 ;

    }
    componentDidMount(){
        const { navigation } = this.props;
        const type = navigation.getParam('type','photo');
        const image = navigation.getParam('image',{uri:null});


        const header  = type == 'photo' ?  <Right>
                                                <TouchableOpacity style={{borderColor:'black', borderWidth:5,margin:2}} onPress={() => {this._rotateImage('+')}} >
                                                    <Icon type='MaterialIcons' name='rotate-left'/>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{borderColor:'black', borderWidth:5,margin:2}} onPress={() => {this._rotateImage('-')}}>
                                                    <Icon type='MaterialIcons'  name='rotate-right'/>
                                                </TouchableOpacity>
                                            </Right>
                                            
                                        : <Right />;
        this.setState({header: header,imageShow:image,imageOriginal:image});

    }
    static navigationOptions = {
        header: null,
        };
        
        _rotateImage= async (action) =>{
        
            if(this.counter>=0){

                if(action == '+' ){
                    this.counter++;
                }else if (action == '-' && this.counter > 0){
                    this.counter--;
                } 

                const img = await ImageManipulator.manipulate(this.state.imageOriginal.uri,
                                                            [   {rotate:(90*this.counter)},
                                                                {flip:{vertical:true}}
                                                            ],
                                                            { format: 'jpg' });
        console.log("aqi4");

                    this.setState({imageShow:{uri:img.uri}});
                  
            }
          
        }
     render(){
        const { navigation } = this.props;
        const type = navigation.getParam('type','photo');
        const mediaContent = type == 'photo' ? <Image style={Styles.Img} source={{ uri: this.state.imageShow.uri}} />
                                             :<Video style={Styles.Img} uri={this.state.imageShow.uri} />;
         return (<Container>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'black'}}/>
                            </Button>
                        </Left>
                        <Body />
                        
                        {this.state.header}
                        
                    </Header>
                    <Content>
                        <Grid>
                            <Row >
                                <Col style={Styles.imgContainer}>
                                     {mediaContent}
                                </Col>
                            </Row>
                        </Grid>
                    </Content>
                    <Footer transparent>
                        <FooterTab>
                            <Button vertical success>
                                <Icon name='gift' type='MaterialCommunityIcons'  />
                                <Text>
                                    gift
                                </Text>
                            </Button>
                            <Button vertical warning>
                                <Icon  name='add-location' type='MaterialIcons' />
                                <Text>
                                    Public
                                </Text>
                            </Button>
                            <Button vertical danger>
                                <Icon name='inbox'  type='MaterialIcons' />
                                <Text>
                                    Direct
                                </Text>
                            </Button>

                        </FooterTab>
                    </Footer>
                 </Container>);
     }
}
export default Preview;