import React ,{Component} from 'react';
import { Container, Header, Content, Left, Button, Icon, Body, Right, Grid, Row, Col, Footer,Text, FooterTab} from 'native-base';
import  Styles from '../../assets/styles/style';
import {Image}from 'react-native';
import Video from './video';

class Preview extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        header: null,
        };
     render(){
        const { navigation } = this.props;
        const image = navigation.getParam('image',{uri:null});
        const type = navigation.getParam('type','photo');
        console.log("imagen",image,"tipo",type)
        const mediaContent = type == 'photo' ? <Image style={Styles.Img} source={{ uri: image.uri}} />:<Video style={Styles.Img} uri={image.uri} />;
         return (<Container>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={()=> this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'black'}}/>
                            </Button>
                        </Left>
                        <Body />
                        <Right />
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