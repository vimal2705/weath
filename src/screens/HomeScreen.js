import React, { useState, useEffect,useRef } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Touchable,
  Modal,
  Image,
  // ScrollView,
SafeAreaView,
  Dimensions,
  FlatList,Linking,
  VirtualizedList,
  ScrollViewBase
} from "react-native";
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'
import SvgComponent from "../assets/svgComponent";
import Carousel from 'react-native-snap-carousel';
import propTypes from "prop-types";
import { connect,useDispatch} from "react-redux";  
import { BlurView } from 'expo-blur';
import MapView ,{Marker,Overlay}from 'react-native-maps';
import Constants from "expo-constants";
import * as Location from "expo-location";
import axios from "axios";
import SearchableDropdown from "react-native-searchable-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Material from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import moon from "../assets/Moon.png"
import air from "../assets/Air.png"
import brokenclouds from "../assets/BrokenClouds.png"
import fewcloudsday from "../assets/FewCloudsDay.png"
import fewcloudsnight from "../assets/FewCloudsNight.png"
import wind from "../assets/Wind.png"
import humd from "../assets/Humidity.png"
import arrow from "../assets/arr.png"
import rainday from "../assets/RainDay.png"
import rainnight from "../assets/RainNight.png"
import scatteredclouds from "../assets/ScatteredClouds.png"
import showerrain from "../assets/ShowerRain.png"
import snow from "../assets/Snow.png"
import sun from "../assets/Sun.png"
import thunderstrom from "../assets/Thunderstrom.png"
import test from "../assets/test.gif"
import mist from "../assets/Mist.png"
import sunrise from "../assets/sunrise.png"
import sunset from "../assets/sunset.png"
import { enableScreens } from 'react-native-screens';
import AnimatedProgress from "react-native-reanimated-progress-bar";
import LottieView from 'lottie-react-native';
import { log, set } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import alldata from "../reducer/alldata";
import { MyLocation } from '../action/location'

const { ScrollView } = ReactNative.NativeModules;
import { StatusBar } from 'expo-status-bar';
const HomeScreen = ({MyLocation, locationState,todayweatherState,alldataState ,cityState,currentaqiState,navigation}) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [location, setlocation] = useState(null);
    const [region, setregion] = useState({
      latitude:parseFloat(locationState.latitude),
      longitude:parseFloat(locationState.longitude),
      latitudeDelta: 20.21,
      longitudeDelta: 20.1,
    })
    const arrays = []
    const [mapp, setmapp] = useState('pressure_new')
    const [mapvisual, setmapvisual] = useState(
      [{
        'name':'Clouds',
        "type":"clouds_new"
      },
      {
        'name':"Precipitation",
        "type":"precipitation_new"
      },
      {
        'name':"Sea level pressure",
        "type":"pressure_new"
      },
      {
        'name':"Wind speed",
        "type":"wind_new"
      },{
        'name':"Temperature",
        "type":"temp_new"
      }]
      )
      const [activeIndex, setIndex] = useState(0)
      const [lat, setlat] = useState(null);
    const [lon, setlon] = useState(null);
    const [city, setcity] = useState("");
    const [timestamp, settimestamp] = useState(alldataState.daily[0].dt);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedcity, setSelectedcity] = useState();
    const [tempdata, settempdata] = useState([]);
    const [daily, setdaily] = useState([])
    const [hourly, sethourly] = useState([])
    const [open, setopen] = useState(false)
    const [currentdate,setCurrentDate] = useState('');
    const [dt, setDt] = useState(new Date().toLocaleString());
    const [time,settime] =useState(Math.floor((new Date()).getTime() / 1000))
    const [today, settoday] = useState()
    const [more, setmore] = useState(false)
const [flag, setflag] = useState(false)
    const [cityname, setcityname] = useState('')
    const goToTokyo = () => {
      //Animate the user to new region. Complete this animation in 3 seconds
      mapRef.current.animateToRegion(region, 1 * 1000);
    };

    const dailyoptions=(array)=>{
    
      return array !== undefined ? 
         array.map((item,index)=>
        (
            <TouchableOpacity  

            onPress={() => {
          
            
              settimestamp(item.dt)
           setopen(true)
              setIndex(index)
            }}
         
            
            style={timestamp === item.dt ? {margin:10,borderRadius:25,alignItems:"center",width:50,}: { borderWidth:1,borderColor:"#fff" ,margin:10,borderRadius:25,alignItems:"center",width:50,}} >

            {timestamp === item.dt  ?   <LinearGradient 
       
       
       colors={time > todayweatherState.todayweather.sys.sunset ? [ '#101011', '#6750b2','#af8cd0']:[ '#001e3b', '#2196F3','#49BEFE','#85dfff',]}
       style={
       
    
          {width:"100%",height:"100%",padding:10,borderRadius:25,alignItems:"center",paddingHorizontal:2 
  
 }
  }> 
   <Image source={
                 item.weather[0].id  === 800 ? sun: item.weather[0].id  === 801 ? fewcloudsday : item.weather[0].id  === 802 ? scatteredclouds: item.weather[0].id  === 803 ||  item.weather[0].id === 804 ? brokenclouds :   item.weather[0].id  === 200 ||  item.weather[0].id === 201 ||  item.weather[0].id === 202 ||  item.weather[0].id === 210 ||  item.weather[0].id === 211 ||  item.weather[0].id === 212 ||  item.weather[0].id === 221 ||  item.weather[0].id === 230 ||  item.weather[0].id === 231 ||  item.weather[0].id === 232 ? thunderstrom :   item.weather[0].id  === 300 ||  item.weather[0].id === 301 ||  item.weather[0].id === 302 ||  item.weather[0].id === 310 ||  item.weather[0].id === 311 ||  item.weather[0].id === 312 ||  item.weather[0].id === 321 ||  item.weather[0].id === 314  ? showerrain : item.weather[0].id  === 600 ||  item.weather[0].id === 601 ||  item.weather[0].id === 602 ||  item.weather[0].id === 611 ||  item.weather[0].id === 612 ||  item.weather[0].id === 613 ||  item.weather[0].id === 615 ||  item.weather[0].id === 616 ||  item.weather[0].id === 620 ||  item.weather[0].id === 621 ||  item.weather[0].id === 622? snow :  item.weather[0].id  ===  701 ||  item.weather[0].id === 711 ||  item.weather[0].id ===  721 ||  item.weather[0].id === 731 ||  item.weather[0].id === 741 ||  item.weather[0].id === 751 ||  item.weather[0].id === 761 ||  item.weather[0].id === 762 ||  item.weather[0].id === 771 ||  item.weather[0].id === 781 ? mist : item.weather[0].id  === 500 ||  item.weather[0].id === 501 ? rainday: item.weather[0].id  === 502 ||  item.weather[0].id === 503 ||  item.weather[0].id === 504 ||  item.weather[0].id === 511 ||  item.weather[0].id === 520 ||  item.weather[0].id === 521 ||  item.weather[0].id === 522 ||  item.weather[0].id === 531 ? showerrain: sun
                
                }   style={{height: Dimensions.get('window').height*0.035,width:Dimensions.get('window').height*0.035}}  /> 
            
          
              <Text style={{color:"#fff",fontSize:18,marginTop:5}}>{moment(item.dt * 1000).format("ddd")}</Text>
              <View style={{flexDirection:"row"}}>
                <Text style={{color:"#fff",fontSize:16,marginTop:5}}>{(Math.round((item.temp.day)-273.15))}</Text>
                <Text  style={{color:"#fff",fontSize:10,marginTop:5}}>°C</Text>
                </View>
          
  </LinearGradient> :
            <View style={{width:"100%",height:"100%",padding:10,borderRadius:25,alignItems:"center",paddingHorizontal:2 }}>
 <Image source={
                 item.weather[0].id  === 800 ? sun: item.weather[0].id  === 801 ? fewcloudsday : item.weather[0].id  === 802 ? scatteredclouds: item.weather[0].id  === 803 ||  item.weather[0].id === 804 ? brokenclouds :   item.weather[0].id  === 200 ||  item.weather[0].id === 201 ||  item.weather[0].id === 202 ||  item.weather[0].id === 210 ||  item.weather[0].id === 211 ||  item.weather[0].id === 212 ||  item.weather[0].id === 221 ||  item.weather[0].id === 230 ||  item.weather[0].id === 231 ||  item.weather[0].id === 232 ? thunderstrom :   item.weather[0].id  === 300 ||  item.weather[0].id === 301 ||  item.weather[0].id === 302 ||  item.weather[0].id === 310 ||  item.weather[0].id === 311 ||  item.weather[0].id === 312 ||  item.weather[0].id === 321 ||  item.weather[0].id === 314  ? showerrain : item.weather[0].id  === 600 ||  item.weather[0].id === 601 ||  item.weather[0].id === 602 ||  item.weather[0].id === 611 ||  item.weather[0].id === 612 ||  item.weather[0].id === 613 ||  item.weather[0].id === 615 ||  item.weather[0].id === 616 ||  item.weather[0].id === 620 ||  item.weather[0].id === 621 ||  item.weather[0].id === 622? snow :  item.weather[0].id  ===  701 ||  item.weather[0].id === 711 ||  item.weather[0].id ===  721 ||  item.weather[0].id === 731 ||  item.weather[0].id === 741 ||  item.weather[0].id === 751 ||  item.weather[0].id === 761 ||  item.weather[0].id === 762 ||  item.weather[0].id === 771 ||  item.weather[0].id === 781 ? mist : item.weather[0].id  === 500 ||  item.weather[0].id === 501 ? rainday: item.weather[0].id  === 502 ||  item.weather[0].id === 503 ||  item.weather[0].id === 504 ||  item.weather[0].id === 511 ||  item.weather[0].id === 520 ||  item.weather[0].id === 521 ||  item.weather[0].id === 522 ||  item.weather[0].id === 531 ? showerrain: sun
                
                }   style={{height: Dimensions.get('window').height*0.035,width:Dimensions.get('window').height*0.035}}  /> 
            
          
              <Text style={{color:"#fff",fontSize:18,marginTop:5}}>{moment(item.dt * 1000).format("ddd")}</Text>
              <View style={{flexDirection:"row"}}>
                <Text style={{color:"#fff",fontSize:16,marginTop:5}}>{(Math.round((item.temp.day)-273.15))}</Text>
                <Text  style={{color:"#fff",fontSize:10,marginTop:5}}>°C</Text>
                </View>
          
              </View>
             
            }
           
                
                  </TouchableOpacity>
                )




      )
          :null
    }
    const isCarousel = React.useRef(null)
    const renderitem = ({item,index}) => {
      return (
        
        <LinearGradient 
       key={index}
       
        colors={time > todayweatherState.todayweather.sys.sunset ? [ '#101011', '#6750b2','#af8cd0']:[ '#001e3b','#2196F3','#49BEFE','#85dfff',]}
        style={{
            backgroundColor:'floralwhite',
            borderRadius: 5,
            height: 400,
          
            paddingLeft:10,
            paddingRight:10,
           
          }}>
         <TouchableOpacity 
    onPress={() => setopen(false)}

    >

    <Image source={require('../assets/Arrow_Down.png')} style={{height:30,width:30,alignSelf:"center",top:-10}} />
    </TouchableOpacity>

               <View  style={{flexDirection:"row"}}>
               <Image source={
       item.weather[0].id  === 800 ? sun: item.weather[0].id  === 801 ? fewcloudsday : item.weather[0].id  === 802 ? scatteredclouds: item.weather[0].id  === 803 ||  item.weather[0].id === 804 ? brokenclouds :   item.weather[0].id  === 200 ||  item.weather[0].id === 201 ||  item.weather[0].id === 202 ||  item.weather[0].id === 210 ||  item.weather[0].id === 211 ||  item.weather[0].id === 212 ||  item.weather[0].id === 221 ||  item.weather[0].id === 230 ||  item.weather[0].id === 231 ||  item.weather[0].id === 232 ? thunderstrom :   item.weather[0].id  === 300 ||  item.weather[0].id === 301 ||  item.weather[0].id === 302 ||  item.weather[0].id === 310 ||  item.weather[0].id === 311 ||  item.weather[0].id === 312 ||  item.weather[0].id === 321 ||  item.weather[0].id === 314  ? showerrain : item.weather[0].id  === 600 ||  item.weather[0].id === 601 ||  item.weather[0].id === 602 ||  item.weather[0].id === 611 ||  item.weather[0].id === 612 ||  item.weather[0].id === 613 ||  item.weather[0].id === 615 ||  item.weather[0].id === 616 ||  item.weather[0].id === 620 ||  item.weather[0].id === 621 ||  item.weather[0].id === 622? snow :  item.weather[0].id  ===  701 ||  item.weather[0].id === 711 ||
         item.weather[0].id ===  721 ||  item.weather[0].id === 731 ||  item.weather[0].id === 741 ||  item.weather[0].id === 751 ||  item.weather[0].id === 761 ||  item.weather[0].id === 762 ||  item.weather[0].id === 771 ||  item.weather[0].id === 781 ? mist : item.weather[0].id  === 500 ||  item.weather[0].id === 501 ? rainday: item.weather[0].id  === 502 ||  item.weather[0].id === 503 ||  item.weather[0].id === 504 ||  item.weather[0].id === 511 ||  item.weather[0].id === 520 ||  item.weather[0].id === 521 ||  item.weather[0].id === 522 ||  item.weather[0].id === 531 ? showerrain: sun
      
      }  style={{height: Dimensions.get('window').height*0.10,width:Dimensions.get('window').height*0.10}} /> 
         <View  style={{flexDirection:"row",width:"80%",justifyContent:"space-between"}}>
            <View  style={{marginTop:15,marginLeft:20}}>
            <Text style={{fontSize:20,color:"#fff"}}>{item.weather[0].main}</Text>
          <Text style={{fontSize:16,color:"#fff"}}>{item.weather[0].description}</Text>
        </View>
  
        <View style={{marginTop:15}}>
          <Text style={{fontSize:20,color:"#fff",paddingRight:5}}>{moment(item.dt * 1000).format("ddd")}</Text>
          <Text style={{fontSize: 16 ,color:"#fff",paddingRight:5}}>{moment(item.dt * 1000).format("D MMM YY")}</Text>
          </View >
        </View>
        </View>
            

         

        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",marginTop: Dimensions.get('window').height*0.005,paddingHorizontal:10}}> 
                  
        
                  <View style={{alignItems:"center"}}>
                 <Image source={sunrise}  style={{height:30,width:30}} /> 
                 <Text style={{color: "#fff",}}>{moment(item.sunrise * 1000).format(" HH:mm")}</Text>
                 </View>
        
        {
        <AnimatedProgress 
           fill="#FDB813" // fill of progress bar
           current={(time*1000)-(item.sunrise * 1000)} // current position current/total
           total={(item.sunset* 1000)-(item.sunrise * 1000)} // total parts for iterations
           style={{ height: 5 ,marginTop:25,marginHorizontal:2}} // container style
           
        />
        }
                 
        {/* <IconicBar progress={60} initialProgress={100} icon={"ios-sunny"} iconColor={"#f9d71c"} iconSize={25} /> */}
        
               
        
           <View  style={{alignItems:"center"}}>
           <Image source={sunset}  style={{height:30,width:30}}/>
           <Text  style={{color: "#fff",}}>{moment(item.sunset* 1000).format(" HH:mm")}</Text>
          </View>
        
           
           
            </View>
   
          <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:2}}>
          <View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
            
            <View style={{flexDirection:"row"}}>
            <Text style={{color:"#fff"}}>{(Math.round((item.temp.max)-273.15))}</Text>
<Text  style={{color:"#fff",fontSize:10}}>°C</Text>
</View>
<Text style={{color:"#fff"}}>Max</Text>

          </View>
          
          <View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
            
            <View style={{flexDirection:"row"}}>
<Text style={{color:"#fff"}}>{(Math.round((item.temp.morn)-273.15))}</Text>
<Text  style={{color:"#fff",fontSize:10}}>°C</Text>
</View>
<Text style={{color:"#fff"}}>Morning</Text>

          </View>
          <View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
          <View style={{flexDirection:"row"}}>
          <Text  style={{color:"#fff"}}>{(Math.round((item.temp.day)-273.15))}</Text>
          <Text  style={{color:"#fff",fontSize:10}}>°C</Text>
          </View>
          <Text style={{color:"#fff"}}>Day</Text>
          </View>
         
          <View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
          <View style={{flexDirection:"row"}}>
<Text  style={{color:"#fff"}}>{(Math.round((item.temp.eve)-273.15))}</Text>
<Text  style={{color:"#fff",fontSize:10}}>°C</Text>
          </View>
<Text style={{color:"#fff"}}>Evening</Text>
</View>

<View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
<View style={{flexDirection:"row"}}>
<Text  style={{color:"#fff"}}>{(Math.round((item.temp.night)-273.15))}</Text>
<Text  style={{color:"#fff",fontSize:10}}>°C</Text>
          </View>
<Text style={{color:"#fff"}}>Night</Text>
</View>
<View  style={{padding:10,alignContent:"center",alignItems:"center"}}>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#fff"}}>{(Math.round((item.temp.min)-273.15))}</Text>
<Text  style={{color:"#fff",fontSize:10}}>°C</Text>
          </View>
<Text style={{color:"#fff"}}>Min</Text>
</View>

         </View>
         
   
         <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
           <View  style={{width:"33%",marginTop:10}}>
           <Text style={{alignSelf:"center",color:"#fff",
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>Pressure</Text>
           <Text style={{alignSelf:"center",color:"#fff",fontSize:20}}>{item.pressure} hPa</Text>
         
           </View >
           <View style={{width:"33%",marginTop:10}} >
           <Text style={{alignSelf:"center",color:"#fff",color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>Humidity</Text>
          <Text style={{alignSelf:"center",color:"#fff",fontSize:20}}>{item.humidity}%</Text>
         
          </View>
          <View  style={{width:"33%",marginTop:10,alignItems:"center"}}>
          <Text style={{alignSelf:"center",color:"#fff",color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>Dew point</Text>
          
          <View style={{flexDirection:"row"}}>
          <Text style={{alignSelf:"center",color:"#fff",fontSize:20}}>{(Math.round((item.dew_point)-273.15))}</Text>
          <Text  style={{color:"#fff",fontSize:10}}>°C</Text>
          </View>
        
          </View>
           </View>
           <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
           <View  style={{width:"33%",marginTop:20}} >
           <Text style={{alignSelf:"center",color:"#fff",color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>Wind speed</Text>
           <View style={{flexDirection:"row",alignSelf:"center"}}>
           <Image source={arrow}  style={{height:15,width:15, transform: [{ rotate:`${item.wind_deg}deg`}]}} /> 
<Text style={{color:"#fff",fontSize:20}}>{(parseFloat((item.wind_speed)*18/5).toFixed(2))} km/h</Text>


</View>
         
         
        
           </View >
           <View  style={{width:"33%",marginTop:20}}>
           <Text style={{alignSelf:"center",color:"#fff",color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>UV index</Text>
          <Text style={{alignSelf:"center",color:"#fff",fontSize:20}}>{item.uvi}</Text>
 
          </View>
          <View style={{width:"33%",marginTop:20}}>
          <Text style={{alignSelf:"center",color:"#fff",color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 2,}}>Wind gust</Text>
          <Text style={{alignSelf:"center",color:"#fff",fontSize:20}}>{(parseFloat((item.wind_gust)*3.6).toFixed(2))} km/h</Text>

          </View>
           </View>
      
        
{/*     
<View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <View style={{width:"48%",marginTop:20}}>
          <Text style={{alignSelf:"center",color:"#fff"}}>{moment(item.sunrise * 1000).format(" HH:mm")}</Text>
<Text style={{alignSelf:"center",color:"#fff"}}>sun rise</Text>
</View>
<View style={{width:"48%",marginTop:20}}>
          <Text style={{alignSelf:"center",color:"#fff"}}>{moment(item.sunset * 1000).format(" HH:mm")}</Text>
          <Text style={{alignSelf:"center",color:"#fff"}}>Sun Set</Text>
          </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>

<View style={{width:"48%",marginTop:20}}>
          <Text style={{alignSelf:"center",color:"#fff"}}>{moment(item.moonrise * 1000).format(" HH:mm")}</Text>
          <Text style={{alignSelf:"center",color:"#fff"}}>Moon rise</Text>
          </View>
<View style={{width:"48%",marginTop:20}}>
          <Text style={{alignSelf:"center",color:"#fff"}}>{moment(item.moonset * 1000).format(" HH:mm")}</Text>
          <Text style={{alignSelf:"center",color:"#fff"}}>Moon Set</Text>
          </View>

     </View> */}




        </LinearGradient >
        

      )
  }
    const renderOptions=(array)=>{
    
      return array !== undefined ? 
         array.map((item,index) =>
      <TouchableOpacity
      key={index}
      onPress={()=>{
          setmapp(item.type)
        
      }} 
  
      style = {mapp === (item.type) ?{borderRadius:10,justifyContent:"center",alignItems:"center",margin:10,paddingHorizontal:5,backgroundColor:"#001e3b",borderColor:"#005478"} :{borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",margin:10,paddingHorizontal:5}}
     
     >
         <View >
            <Text  style= {mapp === (item.type)? {color:"white"} :{color:"black"}} >{item.name}</Text>
        
  
          </View>
          </TouchableOpacity>)
          :null
    }

    setInterval(() => {

      if ((Math.floor((new Date()).getTime() / 1000)) >= todayweatherState.todayweather.sys.sunset)
       {
      settoday(1)
      }
    }, 10000);
   
   
    const changeRegion = () =>{
      setregion(region)
      }
useEffect(() => {

    setlocation(locationState.city)
console.log('asdas',todayweatherState.loading);
      

    // for (let i = 0; i < cityState.TopCity.length; i++) {

    //   if (condition) {
        
    //   }
   
    // }
 
 
    // setSelectedcity(cityState.city)
   
    const unsubscribe = navigation.addListener('focus', () => {

      enableScreens()
      
 
    });

    console.log('ghj');


  return unsubscribe;

}, [location,selectedcity,tempdata,today,cityname,region,mapp])

const send = (lat,lon,name) => {
MyLocation({lat,lon})
console.log('city name',name);
setlocation(name)
goToTokyo()
}
// if (todayweatherState.loading) {
//     return (
//       <View style={{alignContent:"center",alignItems:"center",justifyContent:"center",flex:1}}>
//          <LottieView
       
//        style={{
//          width:300,
//          height:300,
       
       
//        }}
//        source={require('./src/assets/loadingg_.json')}
//       autoPlay
//      />
//       </View>
//     )
// }

  return (
    <View style={styles.container}>
  <StatusBar style="light" />
 <LinearGradient 
       
       
       colors={time > todayweatherState.todayweather.sys.sunset ? [ '#101011', '#6750b2','#af8cd0']:[ '#001e3b', '#2196F3','#49BEFE','#85dfff',]}
       style={
       
         {
    height:Dimensions.get('window').height,
    backgroundColor: "#49BEFE",
    width:"100%",
  flex: 1,
  alignItems: "center",
  
 }
  }> 
    <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between",marginTop:Constants.statusBarHeight}}>
  <TouchableOpacity
    style={{paddingLeft:10,paddingTop:8}}
    onPress={() => {
     setModalVisible(true) 
      // navigation.navigate('LocationScreen')
    }}

  >
    <Material name="location-searching" color="#FFF" size={ Dimensions.get('window').height*0.03} style={{backgroundColor:"transparent"}}/>
  
  </TouchableOpacity>
  
  <TouchableOpacity
    style={{ alignSelf:"center" }}
    onPress={() => console.log('sadfgh')}
  >
    {locationState.city === undefined? (
      <Text style={{ marginTop: Dimensions.get('window').height*0.0035,
        fontSize:Dimensions.get('window').height*0.03,
      color: "#fff",


      color: "#fff",  
      textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    }}>
        {cityname}  </Text>
    ) : (
      <Text
        style={{marginTop: Dimensions.get('window').height*0.005,
          fontSize:Dimensions.get('window').height*0.028,
          color: "#fff",
    paddingBottom:-2,

          color: "#fff",  
          textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        }}
      > {locationState.city}   </Text>
    )}
  </TouchableOpacity>

  <View  style={{paddingLeft:20}}></View>
   </View>
   <Text style={{marginTop: Dimensions.get('window').height*0.003,  fontSize: Dimensions.get('window').height*0.025,
            color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,}} > Today </Text>

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
          <View  style={styles.modalView}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => {
              //  MyLocation({item})
               
                setlat(item.lat);
                setlon(item.lon);
                console.log('asdasdasdas',item.name);
                send(item.lat,item.lon,item.name)
              setcityname(item.name)

                // allinone(latitiude, longitude)
              // console.log(lon,'rty',lat);
            
                setModalVisible(!modalVisible);
              }}
              textInputStyle={{
                width: 280,
                paddingRight: 100,
                paddingLeft: 10,
                paddingVertical: 10,
                marginTop:5,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#FAF7F6",
                fontSize: 18,
                borderTopLeftRadius:20,
                borderTopRightRadius:20
              }}
              itemStyle={{
                padding: 10,

                backgroundColor: "#FAF9F8",
                borderColor: "#bbb",
                borderRightWidth: 1,
                borderLeftWidth: 1,
              }}
              itemTextStyle={{
                color: "#222",
              }}
              itemsContainerStyle={{
                maxHeight: "80%",
              }}
              
              items={selectedcity}
              placeholder="search city"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
            <ScrollView

           >
     
           
              
           <SafeAreaView  style={{flexDirection:"row"}}>
       <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top10.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>

    <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top20.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top30.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top40.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top50.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
           
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    <View style={{  flexWrap: "wrap",
    flexDirection: "column",}}>
        {cityState.Top60.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                    setModalVisible(!modalVisible);
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    </SafeAreaView>

    </ScrollView>


{/*  
            <FlatList
           keyExtractor={(item, index) => index.toString()}
           horizontal={true}
    data={cityState.Top10}
  
style={{alignContent:"center",margin:10}}

    renderItem={({item}) => 
     <TouchableOpacity 
     onPress={() => {
      setlat(item.lat);
      setlon(item.lon);
      console.log('asdasdasdas',item.name);
      send(item.lat,item.lon,item.name)
    setcityname(item.name)

      // allinone(latitiude, longitude)
    // console.log(lon,'rty',lat);
  
      setModalVisible(!modalVisible);
     }} style={{borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
    <Text>{item.name}</Text>
    </TouchableOpacity>
   

   

    
            
  
            }
            /> */}

        
        
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "#2196F3",
                borderRadius: 15,
                position:"absolute"
                ,top:5,
                right:5
             
              }}
              onPress={() => {setModalVisible(!modalVisible)
              enableScreens()
              }}
            >
              <Icon name="close" color="#FFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView

 
      style={{width:"100%" ,paddingBottom:40,  borderBottomLeftRadius:25,
  borderBottomRightRadius:25,}}
  
  >
    



     <View style={{alignItems:"center",  borderBottomLeftRadius:25,
  borderBottomRightRadius:25,}}>
      
     {
       time > todayweatherState.todayweather.sys.sunset ?  <LottieView
       
       style={{
         width: Dimensions.get('window').height*0.25,
         height:(Dimensions.get('window').height*0.25),
       
       
       }}
       source={todayweatherState.todayweather.weather[0].id  === 800 ? require('../assets/Moon.json'):
       todayweatherState.todayweather.weather[0].id   === 801 ? require('../assets/Few_Clouds_Night.json'):todayweatherState.todayweather.weather[0].id   === 802 ? require('../assets/Scattered_Clouds_Night.json'):todayweatherState.todayweather.weather[0].id  === 803 || todayweatherState.todayweather.weather[0].id === 804 ? require('../assets/Broken_Clouds_Night.json'):  todayweatherState.todayweather.weather[0].id  === 200 || todayweatherState.todayweather.weather[0].id === 201 ||
        todayweatherState.todayweather.weather[0].id === 202 || todayweatherState.todayweather.weather[0].id === 210 || todayweatherState.todayweather.weather[0].id === 211 || todayweatherState.todayweather.weather[0].id === 212 || todayweatherState.todayweather.weather[0].id === 221 || todayweatherState.todayweather.weather[0].id === 230 || todayweatherState.todayweather.weather[0].id === 231 || todayweatherState.todayweather.weather[0].id === 232 ? require('../assets/Thunderstrom_Night.json') :  todayweatherState.todayweather.weather[0].id  === 300 || todayweatherState.todayweather.weather[0].id === 301 || todayweatherState.todayweather.weather[0].id === 302 || todayweatherState.todayweather.weather[0].id === 310 || todayweatherState.todayweather.weather[0].id === 311 || todayweatherState.todayweather.weather[0].id === 312 || todayweatherState.todayweather.weather[0].id === 321 || todayweatherState.todayweather.weather[0].id === 314  ? require('../assets/shower.json') :todayweatherState.todayweather.weather[0].id  === 600 || todayweatherState.todayweather.weather[0].id === 601 || todayweatherState.todayweather.weather[0].id === 602 || todayweatherState.todayweather.weather[0].id === 611 || todayweatherState.todayweather.weather[0].id === 612 || todayweatherState.todayweather.weather[0].id === 613 || todayweatherState.todayweather.weather[0].id === 615 || todayweatherState.todayweather.weather[0].id === 616 || 
        todayweatherState.todayweather.weather[0].id === 620 || todayweatherState.todayweather.weather[0].id === 621 || todayweatherState.todayweather.weather[0].id === 622? require('../assets/Snow_Night.json') : todayweatherState.todayweather.weather[0].id  ===  701 || todayweatherState.todayweather.weather[0].id === 711 || todayweatherState.todayweather.weather[0].id ===  721 || todayweatherState.todayweather.weather[0].id === 731 || todayweatherState.todayweather.weather[0].id === 741 || todayweatherState.todayweather.weather[0].id === 751 || todayweatherState.todayweather.weather[0].id === 761 || todayweatherState.todayweather.weather[0].id === 762 || todayweatherState.todayweather.weather[0].id === 771 || todayweatherState.todayweather.weather[0].id === 781 ? require('../assets/Mist.json') :todayweatherState.todayweather.weather[0].id  === 500 || todayweatherState.todayweather.weather[0].id === 501 ? require('../assets/Rain_Night.json'):todayweatherState.todayweather.weather[0].id  === 502 || todayweatherState.todayweather.weather[0].id === 503 || todayweatherState.todayweather.weather[0].id === 504 || todayweatherState.todayweather.weather[0].id === 511 || todayweatherState.todayweather.weather[0].id === 520 || todayweatherState.todayweather.weather[0].id === 521 || todayweatherState.todayweather.weather[0].id === 522 || todayweatherState.todayweather.weather[0].id === 531 ? require('../assets/shower.json'): require('../assets/lf30_editor_5custncl.json')}
      autoPlay
     />:
     <LottieView
       
     style={{
       width: Dimensions.get('window').height*0.25,
       height:(Dimensions.get('window').height*0.25),
     
     
     }}
     source={todayweatherState.todayweather.weather[0].id  === 800 ? require('../assets/Sun.json'):
     todayweatherState.todayweather.weather[0].id   === 801 ? require('../assets/Few_Clouds_Day.json'):todayweatherState.todayweather.weather[0].id   === 802 ? require('../assets/Scattered_Clouds_Day.json'):todayweatherState.todayweather.weather[0].id  === 803 || todayweatherState.todayweather.weather[0].id === 804 ? require('../assets/Broken_Clouds_Day.json'):  todayweatherState.todayweather.weather[0].id  === 200 || todayweatherState.todayweather.weather[0].id === 201 ||
      todayweatherState.todayweather.weather[0].id === 202 || todayweatherState.todayweather.weather[0].id === 210 || todayweatherState.todayweather.weather[0].id === 211 || todayweatherState.todayweather.weather[0].id === 212 || todayweatherState.todayweather.weather[0].id === 221 || todayweatherState.todayweather.weather[0].id === 230 || todayweatherState.todayweather.weather[0].id === 231 || todayweatherState.todayweather.weather[0].id === 232 ? require('../assets/Thunderstrom_Day.json') :  todayweatherState.todayweather.weather[0].id  === 300 || todayweatherState.todayweather.weather[0].id === 301 || todayweatherState.todayweather.weather[0].id === 302 || todayweatherState.todayweather.weather[0].id === 310 || todayweatherState.todayweather.weather[0].id === 311 || todayweatherState.todayweather.weather[0].id === 312 || todayweatherState.todayweather.weather[0].id === 321 || todayweatherState.todayweather.weather[0].id === 314  ? require('../assets/shower.json') :todayweatherState.todayweather.weather[0].id  === 600 || todayweatherState.todayweather.weather[0].id === 601 || todayweatherState.todayweather.weather[0].id === 602 || todayweatherState.todayweather.weather[0].id === 611 || todayweatherState.todayweather.weather[0].id === 612 || todayweatherState.todayweather.weather[0].id === 613 || todayweatherState.todayweather.weather[0].id === 615 || todayweatherState.todayweather.weather[0].id === 616 || 
      todayweatherState.todayweather.weather[0].id === 620 || todayweatherState.todayweather.weather[0].id === 621 || todayweatherState.todayweather.weather[0].id === 622? require('../assets/Snow_Day.json') : todayweatherState.todayweather.weather[0].id  ===  701 || todayweatherState.todayweather.weather[0].id === 711 || todayweatherState.todayweather.weather[0].id ===  721 || todayweatherState.todayweather.weather[0].id === 731 || todayweatherState.todayweather.weather[0].id === 741 || todayweatherState.todayweather.weather[0].id === 751 || todayweatherState.todayweather.weather[0].id === 761 || todayweatherState.todayweather.weather[0].id === 762 || todayweatherState.todayweather.weather[0].id === 771 || todayweatherState.todayweather.weather[0].id === 781 ? require('../assets/Mist.json') :todayweatherState.todayweather.weather[0].id  === 500 || todayweatherState.todayweather.weather[0].id === 501 ? require('../assets/Rain_Day.json'):todayweatherState.todayweather.weather[0].id  === 502 || todayweatherState.todayweather.weather[0].id === 503 || todayweatherState.todayweather.weather[0].id === 504 || todayweatherState.todayweather.weather[0].id === 511 || todayweatherState.todayweather.weather[0].id === 520 || todayweatherState.todayweather.weather[0].id === 521 || todayweatherState.todayweather.weather[0].id === 522 || todayweatherState.todayweather.weather[0].id === 531 ? require('../assets/shower.json'): require('../assets/lf30_editor_5custncl.json')}
    autoPlay
   />
     } 
    
      <Text
            style={{
           
              fontSize: (Dimensions.get('window').height*0.05),
              color: "#fff",  
            
              fontWeight: "bold",
              textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
            }}
          >{(Math.round((todayweatherState.todayweather.main.temp)-273.15))}<Text>°C</Text> </Text>
          <Text
          style={{
            fontSize: Dimensions.get('window').height*0.04,
            color: "#fff",  
           
            fontWeight: "bold",
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
          }} >
{todayweatherState.todayweather.weather[0].main} </Text>
<Text  style={{
            fontSize: Dimensions.get('window').height*0.025,
            color: "#fff",  
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
           
          }}>{todayweatherState.todayweather.weather[0].description}</Text>
      {/* <Text style={styles.paragraph}>{location}</Text> */}


     
      <BlurView  intensity={20} tint="light" style={more === true? {width:"90%",height:350,borderRadius:25,marginVertical:20,paddingHorizontal:20}:{width:"90%",height:120,borderRadius:25,marginVertical:20,paddingHorizontal:20}} > 
      
      <Text style={{fontSize:20,alignSelf:"center",color:"#fff",
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5, marginVertical:10}}>Air Quality</Text>
          {more === false ? 
<Text onPress={()=> setmore(!more)} style={{position:"absolute",top:5,right:10,color:"#fff",
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 10, marginVertical:10}} > More info </Text> :
          <Text onPress={()=> setmore(!more)} style={{position:"absolute",top:5,right:10,color:"#fff",
            textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 10, marginVertical:10}} > less info </Text>}
      <View style={{width:"100%",height:40 ,alignItems:'center'}}>
      
          <View style={{flexDirection:"row",paddingHorizontal:10}}>
            <Text>1   </Text>
            {currentaqiState.todayaqi.list[0].main.aqi === 1 ? <View style={{backgroundColor:"green",height:20,width:"25%",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
              <Text style={{alignSelf:"center",color:"#fff"}}>Good</Text>
            </View>:<View style={{backgroundColor:"green",height:5,width:"20%",borderTopLeftRadius:10,borderBottomLeftRadius:10}}></View>}

            {currentaqiState.todayaqi.list[0].main.aqi === 2 ? <View style={{backgroundColor:"lightgreen",height:20,width:"25%"}}>
              <Text style={{alignSelf:"center",color:"#fff"}}>Fair</Text>
            </View>:<View style={{backgroundColor:"lightgreen",height:5,width:"20%"}}></View>}
            {currentaqiState.todayaqi.list[0].main.aqi === 3 ? <View style={{backgroundColor:"yellow",height:20,width:"25%",}}>
              <Text style={{alignSelf:"center",color:"#fff"}}>Moderate</Text>
            </View>:<View style={{backgroundColor:"yellow",height:5,width:"20%"}}></View>}
            {currentaqiState.todayaqi.list[0].main.aqi === 4 ? <View style={{backgroundColor:"orange",height:20,width:"25%",}}>
              <Text style={{alignSelf:"center",color:"#fff"}}>Poor</Text>
            </View>:
<View style={{backgroundColor:"orange",height:5,width:"20%"}}></View>}
{currentaqiState.todayaqi.list[0].main.aqi === 5 ? <View style={{backgroundColor:"red",height:20,width:"25%",borderTopRightRadius:10,borderBottomRightRadius:10}}>
              <Text style={{alignSelf:"center", color:"#fff"}}>v. Poor</Text>
            </View>:
<View style={{backgroundColor:"red",height:5,width:"20%",borderTopRightRadius:10,borderBottomRightRadius:10}}></View>}
<Text>   5</Text>
          </View>
<Text style={{alignSelf:"center"}}>AQI</Text>
       
        </View>
    
        {more === true ? 
            <View>
       <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    
      <View style={{alignItems:"center",width:"50%",marginTop:1}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",    textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Carbon monoxide</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.co}</Text> 
     <Text style={{fontSize:12,color:"#000"}} > μg/m3</Text></Text>
      
       
       </View>
      
       <View style={{alignItems:"center",width:"50%",marginTop:1}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Nitrogen monoxide</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.no}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <View style={{alignItems:"center",width:"50%",marginTop:20,}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Ammonia</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.nh3}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      
       <View style={{alignItems:"center",width:"50%",marginTop:20}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Nitrogen dioxide</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.no2}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <View style={{alignItems:"center",width:"50%",marginTop:20}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Sulfur dioxide</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.so2}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      
       <View style={{alignItems:"center",width:"50%",marginTop:20}}> 
          <Text style={{fontSize:18,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Ozone</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.o3}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <View style={{alignItems:"center",width:"50%",marginTop:20}}> 
          <Text style={{fontSize:15,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Fine particles</Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.pm2_5}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      
       <View style={{alignItems:"center",width:"50%",marginTop:20}}> 
          <Text style={{fontSize:15,color:"#000",alignSelf:"center",textShadowColor: '#fff',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5}}>Coarse particulate </Text>
     <Text style={{alignSelf:"center"}}> <Text  style={{fontSize:18,color:"#000"}}> {currentaqiState.todayaqi.list[0].components.pm10}</Text> 
     <Text style={{fontSize:12,color:"#000"}}> μg/m3</Text></Text>
      
       
       </View>
      </View> 
      </View>
     :null }
      
      
      </BlurView>
      {time > todayweatherState.todayweather.sys.sunset ? 
      
       <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%",marginTop: Dimensions.get('window').height*0.005}}> 
                 
       
                 <View style={{alignItems:"center"}}>
                <Image source={sunset}  style={{height:30,width:30}} /> 
                <Text style={{color: "#fff",}}>{moment( todayweatherState.todayweather.sys.sunset * 1000).format(" HH:mm")}</Text>
                </View>
       
       {
       <AnimatedProgress 
          fill="#07f" // fill of progress bar
          current={(time*1000)-( todayweatherState.todayweather.sys.sunset * 1000)} // current position current/total
          total={(alldataState.daily[1].sunrise* 1000)-( todayweatherState.todayweather.sys.sunset * 1000)} // total parts for iterations
          style={{ height: 5 ,marginTop:25,marginHorizontal:2}} // container style
          
       />
       }
                
       {/* <IconicBar progress={60} initialProgress={100} icon={"ios-sunny"} iconColor={"#f9d71c"} iconSize={25} /> */}
       
              
       
          <View  style={{alignItems:"center"}}>
          <Image source={sunrise}  style={{height:30,width:30}}/>
          <Text  style={{color: "#fff",}}>{moment(alldataState.daily[1].sunrise* 1000).format(" HH:mm")}</Text>
         </View>
       
          
          
           </View> 
      :
        <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%",marginTop: Dimensions.get('window').height*0.005}}> 
                  
        
                  <View style={{alignItems:"center"}}>
                 <Image source={sunrise}  style={{height:30,width:30}} /> 
                 <Text style={{color: "#fff",}}>{moment(todayweatherState.todayweather.sys.sunrise * 1000).format(" HH:mm")}</Text>
                 </View>
        
        {
        <AnimatedProgress 
           fill="#FDB813" // fill of progress bar
           current={(time*1000)-(todayweatherState.todayweather.sys.sunrise * 1000)} // current position current/total
           total={(todayweatherState.todayweather.sys.sunset* 1000)-(todayweatherState.todayweather.sys.sunrise * 1000)} // total parts for iterations
           style={{ height: 5 ,marginTop:25,marginHorizontal:2}} // container style
           
        />
        }
                 
        {/* <IconicBar progress={60} initialProgress={100} icon={"ios-sunny"} iconColor={"#f9d71c"} iconSize={25} /> */}
        
               
        
           <View  style={{alignItems:"center"}}>
           <Image source={sunset}  style={{height:30,width:30}}/>
           <Text  style={{color: "#fff",}}>{moment(todayweatherState.todayweather.sys.sunset* 1000).format(" HH:mm")}</Text>
          </View>
        
           
           
            </View>
}
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{borderRadius:25,marginHorizontal:5}}> 
                {alldataState.hourly.map((user,index) => (
                  <View  >
                  
                 <TouchableOpacity key={index} onPress={() =>
                 {
                  {user.dt >= todayweatherState.todayweather.sys.sunset  &&  user.dt <= alldataState.daily[1].sunrise ? console.log(user.dt,'true',alldataState.daily[0].sunrise) : console.log("false")}
                 }}  style={{
                 
                 padding:5,margin:10,alignItems:"center"}} >
              
              <Text style={{
                   
                 color:"#fff",fontSize: Dimensions.get('window').height*0.022,alignSelf:"center"}}>{moment(user.dt * 1000).format("h a")}</Text>
                  <View style={{flexDirection:"row",marginTop:5}}>
               
                    <Text style={{ color:"#fff",fontSize:16}}>{(Math.round((user.temp)-273.15))}</Text>
                    <Text  style={{ color:"#ffffff",fontSize:10}}>°C</Text>
                    </View>
                    
                    { user.dt >=  todayweatherState.todayweather.sys.sunset &&  user.dt <=  alldataState.daily[0].sunrise   ?  
               <Image source={
        user.weather[0].id  === 800 ? moon: user.weather[0].id  === 801 ? fewcloudsnight : user.weather[0].id  === 802 ? scatteredclouds: user.weather[0].id  === 803 ||  user.weather[0].id === 804 ? brokenclouds :   user.weather[0].id  === 200 ||  user.weather[0].id === 201 ||  user.weather[0].id === 202 ||  user.weather[0].id === 210 ||  user.weather[0].id === 211 ||  user.weather[0].id === 212 ||  user.weather[0].id === 221 ||  user.weather[0].id === 230 ||  user.weather[0].id === 231 ||  user.weather[0].id === 232 ? thunderstrom :   user.weather[0].id  === 300 ||  user.weather[0].id === 301 ||  user.weather[0].id === 302 ||  user.weather[0].id === 310 ||  user.weather[0].id === 311 ||  user.weather[0].id === 312 ||  user.weather[0].id === 321 ||  user.weather[0].id === 314  ? showerrain : user.weather[0].id  === 600 ||  user.weather[0].id === 601 ||  user.weather[0].id === 602 ||  user.weather[0].id === 611 ||  user.weather[0].id === 612 ||  user.weather[0].id === 613 ||  user.weather[0].id === 615 ||  user.weather[0].id === 616 ||  user.weather[0].id === 620 ||  user.weather[0].id === 621 ||  user.weather[0].id === 622? snow :  user.weather[0].id  ===  701 ||  user.weather[0].id === 711 ||  user.weather[0].id ===  721 ||  user.weather[0].id === 731 ||  user.weather[0].id === 741 ||  user.weather[0].id === 751 ||  user.weather[0].id === 761 ||  user.weather[0].id === 762 ||  user.weather[0].id === 771 ||  user.weather[0].id === 781 ? mist : user.weather[0].id  === 500 ||  user.weather[0].id === 501 ? rainnight: user.weather[0].id  === 502 ||  user.weather[0].id === 503 ||  user.weather[0].id === 504 ||  user.weather[0].id === 511 ||  user.weather[0].id === 520 ||  user.weather[0].id === 521 ||  user.weather[0].id === 522 ||  user.weather[0].id === 531 ? showerrain: sun
       
       }  style={{height:30,width:30}} />    
  
        :   user.dt <=  alldataState.daily[0].sunset?  <Image source={
          user.weather[0].id  === 800 ? sun: user.weather[0].id  === 801 ? fewcloudsday : user.weather[0].id  === 802 ? scatteredclouds: user.weather[0].id  === 803 ||  user.weather[0].id === 804 ? brokenclouds :   user.weather[0].id  === 200 ||  user.weather[0].id === 201 ||  user.weather[0].id === 202 ||  user.weather[0].id === 210 ||  user.weather[0].id === 211 ||  user.weather[0].id === 212 ||  user.weather[0].id === 221 ||  user.weather[0].id === 230 ||  user.weather[0].id === 231 ||  user.weather[0].id === 232 ? thunderstrom :   user.weather[0].id  === 300 ||  user.weather[0].id === 301 ||  user.weather[0].id === 302 ||  user.weather[0].id === 310 ||  user.weather[0].id === 311 ||  user.weather[0].id === 312 ||  user.weather[0].id === 321 ||  user.weather[0].id === 314  ? showerrain : user.weather[0].id  === 600 ||  user.weather[0].id === 601 ||  user.weather[0].id === 602 ||  user.weather[0].id === 611 ||  user.weather[0].id === 612 ||  user.weather[0].id === 613 ||  user.weather[0].id === 615 ||  user.weather[0].id === 616 ||  user.weather[0].id === 620 ||  user.weather[0].id === 621 ||  user.weather[0].id === 622? snow :  user.weather[0].id  ===  701 ||  user.weather[0].id === 711 ||  user.weather[0].id ===  721 ||  user.weather[0].id === 731 ||  user.weather[0].id === 741 ||  user.weather[0].id === 751 ||  user.weather[0].id === 761 ||  user.weather[0].id === 762 ||  user.weather[0].id === 771 ||  user.weather[0].id === 781 ? mist : user.weather[0].id  === 500 ||  user.weather[0].id === 501 ? rainday: user.weather[0].id  === 502 ||  user.weather[0].id === 503 ||  user.weather[0].id === 504 ||  user.weather[0].id === 511 ||  user.weather[0].id === 520 ||  user.weather[0].id === 521 ||  user.weather[0].id === 522 ||  user.weather[0].id === 531 ? showerrain: sun
         
         }  style={{height:30,width:30}} />:
   
                         <Image source={
        user.weather[0].id  === 800 ? moon: user.weather[0].id  === 801 ? fewcloudsday : user.weather[0].id  === 802 ? scatteredclouds: user.weather[0].id  === 803 ||  user.weather[0].id === 804 ? brokenclouds :   user.weather[0].id  === 200 ||  user.weather[0].id === 201 ||  user.weather[0].id === 202 ||  user.weather[0].id === 210 ||  user.weather[0].id === 211 ||  user.weather[0].id === 212 ||  user.weather[0].id === 221 ||  user.weather[0].id === 230 ||  user.weather[0].id === 231 ||  user.weather[0].id === 232 ? thunderstrom :   user.weather[0].id  === 300 ||  user.weather[0].id === 301 ||  user.weather[0].id === 302 ||  user.weather[0].id === 310 ||  user.weather[0].id === 311 ||  user.weather[0].id === 312 ||  user.weather[0].id === 321 ||  user.weather[0].id === 314  ? showerrain : user.weather[0].id  === 600 ||  user.weather[0].id === 601 ||  user.weather[0].id === 602 ||  user.weather[0].id === 611 ||  user.weather[0].id === 612 ||  user.weather[0].id === 613 ||  user.weather[0].id === 615 ||  user.weather[0].id === 616 ||  user.weather[0].id === 620 ||  user.weather[0].id === 621 ||  user.weather[0].id === 622? snow :  user.weather[0].id  ===  701 ||  user.weather[0].id === 711 ||  user.weather[0].id ===  721 ||  user.weather[0].id === 731 ||  user.weather[0].id === 741 ||  user.weather[0].id === 751 ||  user.weather[0].id === 761 ||  user.weather[0].id === 762 ||  user.weather[0].id === 771 ||  user.weather[0].id === 781 ? mist : user.weather[0].id  === 500 ||  user.weather[0].id === 501 ? rainday: user.weather[0].id  === 502 ||  user.weather[0].id === 503 ||  user.weather[0].id === 504 ||  user.weather[0].id === 511 ||  user.weather[0].id === 520 ||  user.weather[0].id === 521 ||  user.weather[0].id === 522 ||  user.weather[0].id === 531 ? showerrain: sun
       
       }  style={{height:30,width:30}} />
     

      
      
     }
                  
                    <View style={{flexDirection:"row"}}>

         
<Text style={{color:"#fff",fontSize:13}}>{(parseFloat((user.wind_speed)*3.6).toFixed(2))} </Text>
<Text style={{color:"#fff",fontSize:10,marginTop:3}}>Km/h</Text>

</View>
<View style={{flexDirection:"row"}}>
<Image source={arrow}  style={{height:15,width:15, transform: [{ rotate:`${user.wind_deg}deg`}]}} /> 
<Text style={{color:"#fff",fontSize:13,}}>{user.wind_deg >= 348.75  && user.wind_deg <= 11.25 ? "n":user.wind_deg <= 33.75  && user.wind_deg >= 11.25  ? 'NNE' : user.wind_deg <=  56.25 && user.wind_deg >= 33.75  ? 'NE'  :  user.wind_deg <=  78.75 && user.wind_deg >= 56.25  ? 'ENE' :   user.wind_deg <= 101.25 && user.wind_deg >= 78.75  ? 'E' : user.wind_deg <= 123.75 && user.wind_deg >= 101.25  ? 'ESE' : user.wind_deg <= 146.25 && user.wind_deg >= 123.75  ? 'SE' : user.wind_deg <=  168.75 && user.wind_deg >= 146.25  ? 'SSE' : user.wind_deg <=  191.25 && user.wind_deg >= 168.75  ? 'S' : user.wind_deg <=  213.75 && user.wind_deg >= 191.25  ? 'SSW' : user.wind_deg <=  236.25 && user.wind_deg >= 213.75  ? 'SW' : user.wind_deg <=  258.75 && user.wind_deg >= 236.25  ? 'WSW' : user.wind_deg <=  281.25 && user.wind_deg >= 258.75   ? 'W' : user.wind_deg <=  303.75 && user.wind_deg >= 281.25 ? 'WNW' : user.wind_deg <=  326.25 && user.wind_deg >= 303.75  ? 'NW' : user.wind_deg <=  348.75 && user.wind_deg >= 326.25 ? 'NNW' :"N" } </Text>
</View>
              
                      </TouchableOpacity>
               </View>
                      ))}
                      </ScrollView>
                     
                      </View>
                      <View > 
                      <View style={{height:50,flexDirection:"row",marginBottom:5,width:"95%",alignSelf:"center"}}>
                    <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {  
                  renderOptions(mapvisual)
                  }
               
                    </ScrollView>
                     
                      

                      </View>
                      <View style={{alignSelf:"center",borderRadius:20,marginBottom:10,
                              width: "95%",
                              overflow: 'hidden'}}>
                      <MapView
                              ref={mapRef}
                              mapType={mapp === 'precipitation_new'? "standard":mapp === 'wind_new'? "standard":"hybrid"}

                      style={{  alignSelf:"center",
                      borderRadius:20,
                      
                       
                              width: "100%",
                              height: 300,}}
    initialRegion={region}
 onRegionChange={changeRegion}
    
  >
    <Overlay 
   image={`https://tile.openweathermap.org/map/${mapp}/0/0/0.png?appid=b38e991d02830a9ecadf29376fe02abe`}
   bounds={[
    [-89, -179], 
     [89,180]
   ]}
   opacity={1}
/>
 
<Marker coordinate = {{latitude:parseFloat(locationState.latitude),longitude:parseFloat(locationState.longitude)}}
    pinColor = {"orange"} // any color
    title={locationState.city}
    onPress={() =>console.log('ad',locationState.latitude)}
    />
    
    <Marker
    onPress={() => Linking.openURL('https://haraxy.co/')}
        coordinate={{latitude: 23.19371050, longitude: 72.6146500}}
        title={'Haraxy'}
        description={"Haraxy Technologies Pvt. Ltd."}
    >
<Image source={require('../assets/Haraxy_Location_White.png')} style={{height:60,width:60}}/>

    </Marker>
    
  </MapView>
  </View>
  </View>
                      </ScrollView>

      </LinearGradient>

      {open === true ?
       <View style={{height:400,width:"100%",borderTopLeftRadius:25,borderTopRightRadius:25}}>
   
    <View style={{ flex: 1,  justifyContent: 'center',zIndex:0 ,borderTopLeftRadius:25,borderTopRightRadius:25}}>

    {/* <TouchableOpacity 
    onPress={() => {open ?setopen(false) : setopen(true)}}

    >

    <Image source={require('../assets/Arrow_Down.png')} style={{height:30,width:30,alignSelf:"center",top:-10}} />
    </TouchableOpacity> */}
     
                <Carousel 
                  layout={"default"}
                  ref={isCarousel}
                  data={alldataState.daily}
                  firstItem={activeIndex}
                  sliderWidth={ Dimensions.get('window').width}
                  sliderHeight={400}
                  itemWidth={ Dimensions.get('window').width}
                  itemHeight={400}
                  renderItem={renderitem}
                  style={{zIndex:0}}
                  onBeforeSnapToItem={(index) => {
                    setIndex(index)
                    console.log('asdsa',index)}}
                   onSnapToItem = {(index) => {
                    setIndex(index)
                                        console.log(index)}} 
                  />
                  
            </View>
            

</View> :
<View style={{height:150,width:"100%",marginBottom:10}}>
  <Text style={{alignSelf:"center",color:"#fff",fontSize:18}}>7 Day's forecast</Text>

          <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {  
                  dailyoptions(alldataState.daily)
                  }
               
                    </ScrollView>

    
</View>

    }

    </View>
  );
}
const mapStateToProps = (state) => ({
    locationState: state.location,
    todayweatherState: state.today,
    alldataState: state.alldata,
    cityState: state.allcity,
    currentaqiState:state.currentaqi

  });
  const mapDispatchToProps = {
    MyLocation: (data) => MyLocation(data)
  }


  
HomeScreen.propTypes = {

    locationState: propTypes.object.isRequired,
    todayweatherState:propTypes.object.isRequired,
    alldataState: propTypes.object.isRequired,
    cityState:propTypes.object.isRequired,
    currentaqiState:propTypes.object.isRequired
   
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({

    container:
     Constants.statusBarHeight > 24? {
           backgroundColor: "#000",
         
      alignItems: "center",
    height: Dimensions.get('window').height +Constants.statusBarHeight  }
    :{
    backgroundColor: "#000",
 
    alignItems: "center",
  height: Dimensions.get('window').height 
  
      },
      paragraph: {
        fontSize: 18,
        textAlign: "center",
      },
      centeredView: {
        flex: 1,
      
    
        alignItems: "center",
        marginTop: 22
      },
      map: {
        alignSelf:"center",
borderRadius:25,

        marginBottom:10,
        width: "95%",
        height: 300,
      },
      modalView: {
        margin: 20,
        height:"90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

      
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        margin: 10,
        padding: 10,
        backgroundColor: "#2196F3",
        borderRadius: 15,
      },
      textStyle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
});
