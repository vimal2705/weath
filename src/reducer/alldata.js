import {ALL_DATA,} from '../action/action.types';

const initialState = {
   data:[],
   currentday:[],
   hourly:[],
   daily:[],
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_DATA:
      return {
        ...state,
        data: action.payload,
        currentday:action.currentday,
        hourly:action.hourly,
        daily:action.daily,
        loading: false,
        error: false,
      };


    default:
      return state;
  }
};