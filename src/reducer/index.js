import {combineReducers} from 'redux'
import location from './location'
import today from './today'
import allcity from './allcity'
import alldata from './alldata'
import currentaqi from './currentaqi'



export default combineReducers({
  location,
  today,
  allcity,
  alldata,
  currentaqi,

})