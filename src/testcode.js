const sessionUsers = ["botoks723", "botoks723@gmail.com"];
const users = ["botoks723", "botoks@naver.com"];

const check = sessionUsers.map((suser, ids) => {
  return suser !== users[ids] ? users[ids] : "";
});
console.log(check);
