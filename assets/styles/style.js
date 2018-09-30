import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height ;
const Styles = StyleSheet.create(
    {
        blueDarken4:{backgroundColor:'#0d47a1'},
        amberDarken3:{backgroundColor:'#ff8f00'},
        logo:{borderRadius:250, height: 150,width:150 },
        center:{ flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5
        },
        textWhite:{color:'#fff'},
        topSpace: {marginTop: 25},
        transparent:{backgroundColor: 'transparent',},
        button:{height:100, borderRadius:90,backgroundColor: '#abc',width:90,},
        footer: {height:110},
        buttonSmall: {height:80,width:10,borderRadius:60},
        halfScreen:{  flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: (height *  0.5),},
        fullScreen:{  flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
                height: (height),},
        Img:{
            flex:1,
            width:width,
           
        },
        imgContainer:{  flex: 1,
            
            width: width,
            height: (height *  0.789),}
        
    
        }

    
   
);

export default Styles;