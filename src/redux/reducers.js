import {
  ADD_FOODS_LOADING,
  ADD_FOODS_SUCESS,
  ADD_FOODS_FAILED,
  ALL_FOODS_DETAILS_FAILED,
  ALL_FOODS_DETAILS_LOADING,
  ALL_FOODS_DETAILS_SUCESS,
  CLEAR_DATA,
  DELETE_FOOD_FAIL,
  DELETE_FOOD_SUCCESS,
  GET_FOODS_DETAILS_FAILED,
  GET_FOODS_DETAILS_LOADING,
  GET_FOODS_DETAILS_SUCESS,
  LOAD_USER_FAIL,
  LOAD_USER_LOADING,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_FOOD_DETAILS_FAILED,
  UPDATE_FOOD_DETAILS_LOADING,
  UPDATE_FOOD_DETAILS_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  GET_ALL_USER_LOADING,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_USER_BY_ID_LOADING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_FOODS_BY_USERID_LOADING,
  GET_FOODS_BY_USERID_SUCCESS,
  GET_FOODS_BY_USERID_ERROR,
  SHOW_WARNING,
  CLEAR_WARNING,
  SEND_FRIENDS_LOADING,
  SEND_FRIENDS_SUCCESS,
  SEND_FRIENDS_FAIL,
  DELETE_FOOD_LOADING,
  ADD_FOOD_FOR_USER_LOADING,
  ADD_FOOD_FOR_USER_SUCESS,
  ADD_FOOD_FOR_USER_FAILED,
} from "./constants";

const userInitialState = {
  loading: true,
  isAuthenticated: false,
  error: null,
  user: {},
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
    case USER_REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        error: null,
      };
    case LOAD_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const foodInitialState = {
  foods: [],
  loading: false,
  error: null,
};
export const foodsReducer = (state = foodInitialState, action) => {
  switch (action.type) {
    case ALL_FOODS_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ALL_FOODS_DETAILS_SUCESS:
      return {
        ...state,
        loading: false,
        error: null,
        foods: action.payload.foods,
        foodsCount: action.payload.foodsCount,
      };
    case ALL_FOODS_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const foodDetailsInitialState = {
  food: {},
  loading: false,
  error: null,
};
export const foodDetailsReducer = (state = foodDetailsInitialState, action) => {
  switch (action.type) {
    case GET_FOODS_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        food: null,
      };
    case GET_FOODS_DETAILS_SUCESS:
      return {
        ...state,
        loading: false,
        food: action.payload,
      };
    case GET_FOODS_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const newFoodUpdatedInitialState = {
  loading: false,
  food: null,
  error: null,
};

export const foodUpdateReducer = (
  state = newFoodUpdatedInitialState,
  action
) => {
  switch (action.type) {
    case UPDATE_FOOD_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FOOD_DETAILS_SUCESS:
      return {
        ...state,
        foods: action.payload,
        loading: false,
      };
    case UPDATE_FOOD_DETAILS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const addUserFoodInitialState = {
  loading: false,
  food: null,
  error: null,
};

export const addUserFoodReducer = (state = addUserFoodInitialState, action) => {
  switch (action.type) {
    case ADD_FOOD_FOR_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_FOOD_FOR_USER_SUCESS:
      return {
        ...state,
        food: action.payload,
        loading: false,
      };
    case ADD_FOOD_FOR_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const deleteFoodInitialState = {
  loading: false,
  food: null,
  error: null,
};

export const deleteFoodReducer = (state = deleteFoodInitialState, action) => {
  switch (action.type) {
    case DELETE_FOOD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        loading: false,
      };
    case DELETE_FOOD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const newFoodInitialState = {
  loading: false,
  food: null,
  error: null,
};
export const newFoodReducer = (state = newFoodInitialState, action) => {
  switch (action.type) {
    case ADD_FOODS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_FOODS_SUCESS:
      return {
        ...state,
        loading: false,
        food: action.payload,
        error: null,
      };
    case ADD_FOODS_FAILED:
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const allusersInitialState = {
  loading: false,
  users: [],
  error: null,
};
export const adminReducer = (state = allusersInitialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        users: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_USER_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

const getFoodByUserIdInitialState = {
  loading: false,
  foods: [],
  error: null,
};

export const getFoodByUserId = (
  state = getFoodByUserIdInitialState,
  action
) => {
  switch (action.type) {
    case GET_FOODS_BY_USERID_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FOODS_BY_USERID_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        loading: false,
      };
    case GET_FOODS_BY_USERID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const inviteReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_FRIENDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEND_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null,
      };
    case SEND_FRIENDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const warningReducer = (
  state = { notify: false, message: "" },
  action
) => {
  switch (action.type) {
    case SHOW_WARNING:
      return {
        ...state,
        notify: true,
        message: action.payload,
      };

    case CLEAR_WARNING:
      return {
        ...state,
        notify: false,
      };
    default:
      return state;
  }
};
