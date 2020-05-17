export default {
  setDataInLocal: function (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  getDataInLocal: function (key) {
    let data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
};
