//componente
import Home from './View/home';
import CameraApp from './View/main-camera';
import Loading from './View/loading';
import previewImage from './View/main-camera/preview';

import ChatList from './View/chats/index';
import Chat from './View/chats/chat';


//navigate
import {createStackNavigator , createSwitchNavigator} from 'react-navigation';
// screen: login
const login = createStackNavigator({Home: Home});
//Ready login, App 
const authApp = createStackNavigator({MainCamera: CameraApp,
                                      previewImage:previewImage,
                                      MainChat:ChatList,
                                      Chat: Chat},
                                      {headerMode: 'none',});
//switch 
const flowAuth = createSwitchNavigator(
  {AuthLoading: Loading,
    AuthApp: authApp,
    Login: login,
    },{
      initialRouteName: 'AuthLoading',
    });
    export default flowAuth;