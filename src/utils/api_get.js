import axios from 'axios';

const APIroot = 'http://127.0.0.1:8000/';
const paths = {
  'books': 'accounting/api/books',
  'equities': 'staticdata/api/equities',
  'fund_names':'staticdata/api/organizations/fund_names',
  'identifierCodes': 'staticdata/api/identifiers/codes',
  'identifiers': 'staticdata/api/identifiers',
  'identifierTypes': 'staticdata/api/identifier_types',
  'pbaccounts': 'accounting/api/pbaccounts',
  'prices': 'marketdata/api/prices',
  'strategies': 'accounting/api/strategies',
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