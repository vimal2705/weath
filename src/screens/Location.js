import React ,{useRef,useState,useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions,ScrollView,TouchableOpacity } from 'react-native';
import MapView ,{Marker,Overlay}from 'react-native-maps';
import { connect,useDispatch} from "react-redux";  
import propTypes from "prop-types";
import SearchableDropdown from "react-native-searchable-dropdown";
const Location = ({cityState,locationState}) => {
    const mapRef = useRef(null);
    const [region, setregion] = useState({
        latitude:parseFloat(locationState.latitude),
        longitude:parseFloat(locationState.longitude),
        latitudeDelta: 20.21,
        longitudeDelta: 20.1,
      })
      useEffect(() => {
       console.log('------...>>>',cityState.city);
      }, [])
    return (
        <View style={{alignSelf:"center",justifyContent:"center"}}>
 
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
                  alignSelf:"center",
                width: 280,
                paddingRight: 100,
                paddingLeft: 10,
                paddingVertical: 10,
                marginTop:25,
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
              
              items={cityState.city}
              placeholder="search city"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
            <ScrollView > 
       <View style={{  flexWrap: "wrap",
    flexDirection: "row",}}>
        {cityState.TopCity.map((item,index) => (
                   <TouchableOpacity 
                   onPress={() => {
                    setlat(item.lat);
                    setlon(item.lon);
                    console.log('asdasdasdas',item.name);
                    send(item.lat,item.lon,item.name)
                  setcityname(item.name)
              
                    // allinone(latitiude, longitude)
                  // console.log(lon,'rty',lat);
                
                   
                   }} style={{flexGrow:1, borderWidth:1,padding:5,margin:10,borderRadius:20,paddingHorizontal:10}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
                  
                      ))}


    </View>
    </ScrollView>
            {/* <FlatList
           keyExtractor={(item, index) => index.toString()}
    data={cityState.TopCity}
    numColumns={3}
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

        
        
         
          </View>
    
 

     
    )
}
const mapStateToProps = (state) => ({
    locationState: state.location,
    cityState: state.allcity,
  });
Location.propTypes = {

    locationState: propTypes.object.isRequired,
    cityState:propTypes.object.isRequired,
   
  };

export default connect(mapStateToProps)(Location)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
