import { BASE_URL } from "../../config/api";
import axios from 'axios';
import { GQL_REGISTER } from "../queries/queries";
import { 
  REGISTER_SUCCESS, REGISTER_REJECT, REGISTER_LOADING
} from './actionTypes';

/*
 * LOGIN ACTIONS & THUNKS
 */
const registerUserSuccess = () => { 
  return { 
    type: REGISTER_SUCCESS 
  } 
}
const registerUserReject = () => { 
  return { 
    type: REGISTER_REJECT 
  } 
}
const registerUserLoading = (isLoading = true) => { 
  return { 
    type: REGISTER_LOADING, 
    payload: isLoading 
  } 
}
export const registerNewUser = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(registerUserLoading(true));
    try {
      if (!email) throw {name: 'BadCredentials', message: 'Email is required'};
      if (!password) throw {name: 'BadCredentials', message: 'Password is required'};
      console.log('Submitting registration...');
      const response = await axios({
        url: BASE_URL, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: GQL_REGISTER({ email, password })
      });
      dispatch(registerUserSuccess());
    } catch(err) {
      dispatch(registerUserReject());
      throw err;
    } finally {
      dispatch(registerUserLoading(false));
    }
  }
}