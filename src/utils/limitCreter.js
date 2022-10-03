const func = (objs) => {
  let i = 0;
  let j = 1;
  let currmaxCalorie = objs[i].calorie;
  let currmaxPrice = objs[i].price;

  while (j < objs.length) {
    if (objs[j].name === null) {
      objs[i].totalCalorie = currmaxCalorie;
      objs[i].totalCost = currmaxPrice; //
      currmaxCalorie = 0;
      currmaxPrice = 0;
      i = j + 1;
    } else {
      currmaxCalorie += objs[j].calorie;
      currmaxPrice += objs[j].price;
    }
    j++;
  }
};

export default func;
