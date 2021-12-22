import {CURRENT_AQI} from '../action/action.types';

const initialState = {
   todayaqi: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_AQI:
      return {
        ...state,
        todayaqi: action.payload,
        loading: false,
        error: false,
      };

  

    default:
      return state;
  }
};