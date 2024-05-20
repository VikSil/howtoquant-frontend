import axios from 'axios';

const APIroot = 'http://127.0.0.1:8000/';
const paths = {
  'books': 'accounting/api/books',
  'strategies': 'accounting/api/strategies',
  'pbaccounts': 'accounting/api/pbaccounts',
  'identifierTypes': 'staticdata/api/identifier_types',
  'identifierCodes': 'staticdata/api/identifiers/codes',
  'equities': 'staticdata/api/equities',
  'identifiers': 'staticdata/api/identifiers',
  'prices': 'marketdata/api/prices',
};

export const getGenericRequest = (path) => {
  let URL = APIroot + paths[path];

  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getInstrumentByTicker = (ticker) => {
  let URL = APIroot + 'staticdata/api/equities/' + ticker;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

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

export const getPriceDownload = (id) => {
  let URL = APIroot + 'marketdata/api/prices/download/' + id;
  return axios
    .get(URL)
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

export const getPrices = () => {
  let URL = APIroot + 'marketdata/api/prices';
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getOrganizations = (org_type) => {
  let URL = APIroot + 'staticdata/api/organizations';
  org_type ? (URL += `?org_type=${org_type}`) : null;
  return axios
    .get(URL)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error;
    });
};
