import React, {useEffect,useState} from 'react'
import {Alert, Text,Linking,Platform,BackHandler, View} from 'react-native'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useDispatch, connect} from 'react-redux'

import LocationScreen from './src/screens/Location';

import HomeScreen from './src/screens/HomeScreen'


import { MyLocation } from './src/action/location'

import Constants from "expo-constants";
import * as Location from "expo-location";
import alldata from './src/reducer/alldata'


import LottieView from 'lottie-react-native';


// import {requestPermission} from './utils/AskPermission'





const Stack = createStackNavigator();

const Root=({locationState,MyLocation,alldataState,todayweatherState,currentaqiState}) => {
  enableScreens()
  const dispatch = useDispatch();
  const [data, setdata] = useState([])
  const [flag, setflag] = useState('')
  const [lat, setlat] = useState(null)
  const [lon, setlon] = useState(null)
  const [stat, setstat] = useState(false)


  const checkLocation = async () => {
    let st  =  await Location.getForegroundPermissionsAsync()
   console.log('>>>>>>>>>>',st);
        if (Platform.OS === 'android' && !Constants.isDevice) {
          setErrorMsg(
            'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
          );
          return;
        }
    
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            "Weather App",
            "Weather App will required for location access to get weather repoert of your current city click on open setting and give access of location and restart app",
            [
              {
                text: "Cancel",
                onPress: () => BackHandler.exitApp() ,
                style: "cancel"
              },
              { text: "OpenSetting", onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              }}
            ]
          );
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setdata(location);
        // setlat(location.coords.latitude)
        // setlon(location.coords.longitude)
        const lat = location.coords.latitude
        const lon = location.coords.longitude

        MyLocation({lat,lon})

  }

  useEffect(() => {


 // requestPermission()
   checkLocation()
   console.log('------',todayweatherState.loading);
 
  }, [flag,stat])

 if (todayweatherState.loading) {
    return (
      <View style={{alignContent:"center",alignItems:"center",justifyContent:"center",flex:1}}>
         <LottieView
       
       style={{
         width:300,
         height:300,
       
       
       }}
       source={require('./src/assets/loadingg_.json')}
      autoPlay
     />
      </View>
    )
}
else if (alldataState.loading ) {
  return (
    <View style={{alignContent:"center",alignItems:"center",justifyContent:"center",flex:1}}>
       <LottieView
     
     style={{
      width:300,
      height:300,
     
     
     }}
     source={require('./src/assets/loadingg_.json')}
    autoPlay
   />
    </View>
  )
}

else if (currentaqiState.loading ) {
  return  (
    <View style={{alignContent:"center",alignItems:"center",justifyContent:"center",flex:1}}>
       <LottieView
     
     style={{
      width:300,
      height:300,
     
     
     }}
     source={require('./src/assets/loadingg_.json')}
    autoPlay
   />
    </View>
  )
      
}

  return(
        
    <>
            
    <NavigationContainer>
      <Stack.Navigator >
       
           <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}}/> 
    
           <Stack.Screen name="LocationScreen" component={LocationScreen}  options={{headerShown: false}}/> 
     
      </Stack.Navigator>
    </NavigationContainer>

    </>  
    
)



    
}
const mapDispatchToProps = {
    MyLocation: (data) => MyLocation(data)
  }

const mapStateToProps = (state) => ({
  locationState: state.location,
  alldataState: state.alldata,
  todayweatherState:state.today,
  currentaqiState: state.currentaqi
})


export default connect(mapStateToProps,mapDispatchToProps)(Root)