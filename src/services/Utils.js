const Utils = {
  parseRequestURL: () => {
    let url = location.hash;
    if (url.indexOf("/Question/?") !== -1) {
      url = "#/Question/?";
    } else if (url.indexOf("/Score/?") !== -1) {
      url = "#/Score/?";
    } else if (url.indexOf("#/QuestionPictures/?") !== -1) {
      url = "#/QuestionPictures/?";
    }
    return url;
  },
};

export default Utils;
