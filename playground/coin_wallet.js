const generate_address = () => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let l = Math.floor(Math.random() * (35 - 26) + 26);
  var result = "";
  for (let i = 0; i < l; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    result += chars.substring(rnum, rnum + 1);
  }
  return result;
};
console.log(generate_address());
