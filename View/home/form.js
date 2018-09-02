import React, {Component} from 'react';
import { Form, Item, Label, Input, Button, Text, Row, Col } from 'native-base';
import Styles from '../../assets/styles/style';

class form extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <Form >
                <Item floatingLabel>
                    <Label style={Styles.textWhite}>Username/Email</Label>
                    <Input />
                </Item>
                <Item floatingLabel >
                    <Label style={Styles.textWhite}>Password</Label>
                    <Input secureTextEntry={true} />
                </Item>
                <Row>
                    <Col>
                        <Button full success>
                            <Text>Login</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button full danger onPress={() => this.props.onBack(this.props.idBack)}>
                            <Text>Back</Text>
                        </Button>
                    </Col>
                </Row>
                   
            </Form>
        );
    }
}
export default form;