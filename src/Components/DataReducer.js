// dataReducer.js
const initialState = {
  items: [
    {
      DeviceID:
        "f5591ad0db770dc5ff629e47999d15a99106640eb1ba880a065c09ff4585ef2c",
      lat: "28.5623635",
      long: "77.223073",
    },
  ],
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_DATA":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};

export default DataReducer;
