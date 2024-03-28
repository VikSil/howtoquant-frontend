import axios from "axios";

const APIroot = "http://127.0.0.1:8000/" 

export const getIdentifierTypes = () => {
    let URL = "http://127.0.0.1:8000/staticdata/api/identifier_types";

    return axios
      .get(URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };