const arrayProto = Array.prototype;

export const arrayMethods = Object.create(arrayProto);

let methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "reverse",
  "sort",
];

methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;

    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    return result;
  };
});