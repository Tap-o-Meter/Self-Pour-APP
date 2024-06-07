export default {
  request: function (url, credentials) {
    return Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15000),
      ),
    ]);
  },

  getRequest: function (url) {
    return Promise.race([
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15000),
      ),
    ]);
  },
  formDataReq: function (url, credentials) {
    return Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: credentials,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 120000),
      ),
    ]);
  },
};
