import axios from 'axios';

const APIroot = 'http://127.0.0.1:8000/';

export const postStrategies = (name, description) => {
    let URL = APIroot + 'accounting/api/strategies';
    const body = {name}
    if (typeof description !== undefined){
        body['description'] = description
    }

    return axios
      .post(URL, body)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  export const postOrganizations = (data) => {
    let URL = APIroot + 'staticdata/api/organizations';
    return axios
      .post(URL, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };