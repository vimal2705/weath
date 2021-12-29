
import { IS_LOCATION ,LOCATION_ERROR,TODAY_WEATHER,ALL_CITY, ALL_DATA, CURRENT_AQI} from "./action.types";
import axios from "axios"
export const MyLocation = (data) => async (dispatch) => {
  console.log('kjhkjhkj',data);
  axios.get(
    `https://api.jsonstorage.net/v1/json/ddc5bc78-13fa-4cb7-90ec-dc5b5b6ce2fc`
  )
 .then(function (response) {

 console.log('reaasdasd');
              dispatch({
                type: ALL_CITY,
                payload: response.data,
                Top: response.data.slice(0,50)
              });
        })

        .catch((error) => console.log('err',error))
  axios.get(
    `http://api.openweathermap.org/data/2.5/air_pollution?appid=b38e991d02830a9ecadf29376fe02abe&lat=${data.lat}&lon=${data.lon}`
  ).then(function (response) {

    
    
      dispatch({
          type: CURRENT_AQI,
          payload: response.data,
        });

  }
  )
  axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?appid=b38e991d02830a9ecadf29376fe02abe&lat=${data.lat}&lon=${data.lon}&exclude=current`
  ).then(
    function (response) {
    //  (response.data.daily.slice(1,8))
      console.log('a-0-0-0-0-0-0-0-')
      // sethourly(response.data.hourly.slice(1,24))
        dispatch({
            type: ALL_DATA,
            payload: response.data,
            currentday: response.data.daily[0],
            daily:response.data.daily.slice(0,8),
            hourly:response.data.hourly.slice(2,27)
          });
    }

  )
  .catch((error) => 
  console.log('-----------------------',error))

  try {
    axios.get(
        `https://eu1.locationiq.com/v1/reverse.php?key=pk.70f68c9ae167c0bea1a6ded666abd5e0&lat=${data.lat}&lon=${data.lon}&format=json`
      )
     .then(function (response) {
    
   console.log('00000000000',response.data.address.city);
   
                    axios.get(
                      `https://api.openweathermap.org/data/2.5/weather?q=${response.data.address.city}&appid=b38e991d02830a9ecadf29376fe02abe`
                    ).then(function (response) {
                 
                       console.log('asdasdas')
                      
                      
                        dispatch({
                            type: TODAY_WEATHER,
                            payload: response.data,
                          });

                    }
                    )
                   


                  dispatch({
                    type: IS_LOCATION,
                    payload: response.data.address.city,
                    latitude:data.lat,
                    longitude:data.lon
                  });
            })

            .catch((error) => console.error('eeeee',error))

          
  } catch (error) {
    dispatch({
      type: LOCATION_ERROR,
    });
    console.log(error);
  } 
   
};



