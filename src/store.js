import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  foodDetailsReducer,
  foodsReducer,
  userReducer,
  newFoodReducer,
  adminReducer,
  getUserByIdReducer,
  getFoodByUserId,
  warningReducer,
  inviteReducer,
  foodUpdateReducer,
  deleteFoodReducer,
} from "./redux/reducers";

const reducer = combineReducers({
  user: userReducer,
  foods: foodsReducer,
  foodDetails: foodDetailsReducer,
  newFood: newFoodReducer,
  users: adminReducer,
  userId: getUserByIdReducer,
  foodId: getFoodByUserId,
  warn: warningReducer,
  invite: inviteReducer,
  updatedFood: foodUpdateReducer,
  deleteFood: deleteFoodReducer,
});

let initialState = {
  foods: {
    foods: localStorage.getItem("foods")
      ? JSON.parse(localStorage.getItem("foods"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
