const serialize = function(obj, prefix) {
  let str = [];
  let p;

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p;
      let v = obj[p];

      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) +
              "=" +
              (Number.isInteger(v) ? encodeURIComponent(v) : "")
      );
    }
  }
  return str.join("&");
};

export default serialize;
