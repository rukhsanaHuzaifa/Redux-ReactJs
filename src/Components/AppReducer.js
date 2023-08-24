// counterReducer.js
const initialState = {
  photo: "",
  deviceID: "",
  longitude: "",
  latitude: "",
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PHOTO":
      return {
        ...state,
        photo: action.data,
      };
    case "DEVICEID":
      return {
        ...state,
        deviceID: action.data,
      };
    case "LATITUDE":
      return {
        ...state,
        latitude: action.data,
      };
    case "LONGITUDE":
      return {
        ...state,
        longitude: action.data,
      };

    default:
      return state;
  }
};

export default AppReducer;
