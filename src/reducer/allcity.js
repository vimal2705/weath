import {ALL_CITY,} from '../action/action.types';

const initialState = {
   city:[],
   Top10:[],
   Top20:[],
   Top30:[],
   Top40:[],
   Top50:[],
   Top60:[],
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_CITY:
      return {
        ...state,
        city: action.payload,
        Top10:action.Top10,
        Top20:action.Top20,
        Top30:action.Top30,
        Top40:action.Top40,
        Top50:action.Top50,
        Top60:action.Top60,



        loading: false,
        error: false,
      };


    default:
      return state;
  }
};