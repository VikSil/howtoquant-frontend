import axios from "axios";

const APIroot = "http://127.0.0.1:8000/" 

export const getIdentifierTypes = () => {
    let URL = APIroot+"staticdata/api/identifier_types";

    return axios
      .get(URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getAllEquities = () => {
    let URL = APIroot+"staticdata/api/equities/all";

    return axios
      .get(URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getAllIdentifiers = () => {
    let URL = APIroot+"staticdata/api/idenitifiers/all";

    return axios
      .get(URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };


  export const getPriceDownload = (data) => {
    let URL = APIroot+"marketdata/api/prices/new";
    console.log(data)
    return axios
      .put(URL, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };