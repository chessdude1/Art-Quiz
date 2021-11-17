const Utils = {
  parseRequestURL: () => {
    let url = location.hash;
    // let request = {
    //   resource: null,
    //   id: null,
    //   verb: null,
    // };
    // request.resource = r[1];
    // request.id = r[2];
    // request.verb = r[3];
    return url;
  },
};

export default Utils;
