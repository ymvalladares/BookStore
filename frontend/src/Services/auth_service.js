import jwt_decode from "jwt-decode";

export const Auth_service = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
};
