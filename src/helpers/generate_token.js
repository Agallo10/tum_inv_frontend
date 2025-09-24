//const cryptHelper = require("../helpers/crypt_helper");
//import{createToken} from "../helpers/crypt_helper";
import { createToken } from "./crypt_helper";
import { getEnvVariables } from "./getEnvVariables";


const{VITE_API_SIGN_KEY,VITE_USER_KEY} = getEnvVariables();
export const generateToken = () => createToken(VITE_API_SIGN_KEY,VITE_USER_KEY);

