import React from 'react';
import Home from './View/home';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading: true };

}
async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Home />
    );
  }
}


