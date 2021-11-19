const Utils = {
  parseRequestURL: () => {
    let url = location.hash;
    if (url.indexOf("?") != -1) {
      url = "#/Question/?";
    }
    return url;
  },
};

export default Utils;
