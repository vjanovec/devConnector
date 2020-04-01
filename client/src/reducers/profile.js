import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES} from "../actions/types";
import { setAlert } from './alert';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
}

export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            }    
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                error: payload,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            }

        default: {
            return state;
        }
    }
}