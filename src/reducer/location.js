import {IS_LOCATION,LOCATION_ERROR} from '../action/action.types';

const initialState = {
   city: null,
   latitude: null,
   longitude:null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOCATION:
      return {
        ...state,
        city: action.payload,
        latitude:action.latitude,
        longitude:action.longitude,
        loading: false,
        error: false,
      };

    case LOCATION_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};