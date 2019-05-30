 function delayI(a) {
    return new Promise(resolve => setTimeout(() => resolve(a), 100));
  }
  async function f2() {
    const list = [1, 2, 3, 4];
    const temp = list.map(async a => await delayI(a * a));
    // log(temp);
    const res = await temp;
    // log(res);
  }
  f2();
  async function f3() {
    const list = [1, 2, 3, 4];
    const temp = map(a => delayI(a * a), list);
    // log(temp);
    const res = await temp;
    // log(res);
  }
  f3();
  function f4() {
    return map(a => delayI(a * a), [1, 2, 3, 4]);
  }
  f4().then(console.log)
  (async () => {
    console.log(await f4());
  }) ();
  
  
  
