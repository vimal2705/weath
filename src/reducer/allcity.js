import {ALL_CITY,} from '../action/action.types';

const initialState = {
   city:[],
   TopCity:[],

  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_CITY:
      return {
        ...state,
        city: action.payload,
        TopCity:action.Top,
        loading: false,
        error: false,
      };


    default:
      return state;
  }
};