import React, {Component} from 'react';
import { Form, Item, Label, Input, Button, Text, Row, Col } from 'native-base';
import Styles from '../../assets/styles/style';

class form extends Component {
    constructor(props){
        super(props);

    }

    render(){
        const forgetPsw = this.props.register ? ( 
                                                    <Col>
                                                        <Button full info>
                                                            <Text>Forget your Password??</Text>
                                                        </Button>
                                                    </Col>
                                                ):<Col />;
        return (
            <Form >
                <Item floatingLabel>
                    <Label style={Styles.textWhite}>Username/Email</Label>
                    <Input onChangeText={ this.props.onChangeUser } />
                </Item>
                <Item floatingLabel >
                    <Label style={Styles.textWhite}>Password</Label>
                    <Input secureTextEntry={true} onChangeText={ this.props.onChangePsw } />
                </Item>
                <Row style={Styles.topSpace}>
                    <Col>
                        <Button full success onPress={ this.props.post }>
                            <Text>Login</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button full danger onPress={() => this.props.onBack()}>
                            <Text>Back</Text>
                        </Button>
                    </Col>
                </Row>
                <Row style={Styles.topSpace}>
                    {forgetPsw}
                </Row>
                
            </Form>
        );
    }
}
export default form;