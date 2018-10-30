import React, {Component} from 'react';
import {Video} from 'expo';
import { Row, Grid, Col, Button, Icon } from 'native-base';

class videoHistory extends Component {
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
        </Grid>
               
        );
    }
}
export default videoHistory;