import axios from 'axios';

const APIroot = 'https://h0wt0quant.pythonanywhere.com/';

export const putInstrumentDownload = (data) => {
  let URL = APIroot + 'staticdata/api/instruments';
  return axios
    .put(URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const putPriceDownload = (data) => {
  let URL = APIroot + 'marketdata/api/prices/new';
  return axios
    .put(URL, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const putSavePriceDownload = (data) => {
  let URL = APIroot + 'marketdata/api/prices/download';
  return axios
    .put(URL, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};
