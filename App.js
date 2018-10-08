import React from 'react';
import Routes from './routes'
import { Root } from 'native-base';


import ChatList from './View/chats/index';
import Chat from './View/chats/chat';



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading: true };
    _isMounted = false;


}
async componentDidMount() {
  this._isMounted = true;

  if(this._isMounted){
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
   
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    //    <Chat />           

    return (
      <Root>
          <Routes />
      </Root>
    );
  }
}


