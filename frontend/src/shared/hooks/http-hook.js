import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]); // store refreces of data

  const sendRequest = useCallback(
    async (url, method = "GET", body, headers = {}) => {
      //callback to avoid inf loops and render 1 time
      setIsLoading(true);
      const httpAbortCtrl = new AbortController(); //api supp by browse
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, //link to httpAbortCntrl
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message); //we do have an err but we need to throw it;
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //its a cleanup func
    return activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
