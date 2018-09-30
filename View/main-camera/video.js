import React, {Component} from 'react';
import {Video} from 'expo';
import { Row, Grid, Col, Button, Icon } from 'native-base';
import  Styles from '../../assets/styles/style';

class video extends Component {
    constructor(props){
        super(props);
        this.state= {play:true}
    }
    render(){
        return (
        <Grid>
            <Row style={{  width: '100%',
                            height: '90%'}}>
                <Col>
                    <Video 
                        source={{uri: this.props.uri}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode='stretch'
                        shouldPlay={this.state.play}
                        isLooping
                        style={{  width: '100%',
                                  height: '100%'}}
                    />
                </Col>
            </Row>
            <Row>
                <Col style={{flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'}}
                >
                    <Button transparent  onPress={() => { this.setState((prevState)=>({play:!prevState.play})) }}>
                        <Icon name={this.state.play ? "play" : "pause"} type='FontAwesome'/>
                    </Button>

                </Col>
                    
            </Row>
             
                    
               
           
        </Grid>
               
        );
    }
}
export default video;