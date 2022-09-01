import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constans/userConstans'

export const userLoginReducer = (state = {}, action) => {
  //početni state je prazan {}
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true } //aktivira Loader
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload } //deaktivira Loader i vraća User podatke (userInfo) iz API-a
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload } //deaktivira Loader i vraća error
    case USER_LOGOUT:
      return {} //vraća na početni state
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  //početni state je prazan {}
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true } //aktivira Loader
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload } //deaktivira Loader i vraća User podatke (userInfo) iz API-a
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload } //deaktivira Loader i vraća error

    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  //početni state je prazan user {}
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true } //sve u initialState-u i loader
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload } //deaktivira Loader i vraća User podatke (updatedUser) iz API-a userController.js
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload } //deaktivira Loader i vraća error
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  //početni state je prazan user {}
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true } //sve u initialState-u i loader
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload } //dodat succes:true
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload } //deaktivira Loader i vraća error
    case USER_UPDATE_PROFILE_RESET:
      return {}

    default:
      return state
  }
}

//sve funkcije idu u store.js
