import { useState, useCallback, useEffect } from "react";
let logoutTimer;
export const useAuth = () => {
   
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
  
    const login = useCallback((uid, token, tokenExpiration) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        tokenExpiration || new Date(new Date().getTime() + 1000 * 60 * 60); //curr date + 1h
        setTokenExpirationDate(tokenExpirationDate);//the state diff then the above tokenExpirationDate
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(), //for date spescial
        })
      );
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem("userData"); //logout
    }, []);
  
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();//diff in ms and .getTime(start of time)
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
  
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date() // so we know token  still valid and new Data(obj) turn it to date obj
      ) {
        login(storedData.userId, storedData.token,new Date(storedData.expiration)); //we ensure that it wll login with our data and token
      }
    }, [login]); //run once
  return { token , login , logout, userId};
}