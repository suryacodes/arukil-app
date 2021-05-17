const initialLocationState = {
  location: {},
};

export function locationReducer(state = initialLocationState, action) {

  switch (action.type) {
    case 'GET_LOCATION':
      return {
        location: action.data
      };

    default:
      return state;
  }
}


const initialUserLocationState = {
  userLocation:{}
};

export function userLocationReducer(state = initialUserLocationState, action) {

  switch (action.type) {

      case 'USER_CURRENT_LOCATION':
      return {
        userLocation: action.data
      };

    default:
      return state;
  }
}


