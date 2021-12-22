import {TODAY_WEATHER} from '../action/action.types';

const initialState = {
   todayweather: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TODAY_WEATHER:
      return {
        ...state,
        todayweather: action.payload,
        loading: false,
        error: false,
      };

  

    default:
      return state;
  }
};