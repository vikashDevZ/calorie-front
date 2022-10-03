const func = (objs) => {
  const newArray = [];
  const tempObj = {
    name: null,
    newDate:"",
  };

  newArray.push(objs[0]);

  for (let i = 1; i < objs.length; i++) {
    if(objs[i].newDate===objs[i-1].newDate){
        newArray.push(objs[i]);
    }else{
        newArray.push(tempObj);
        newArray.push(objs[i]);
    }
  }
  newArray.push(tempObj);

  return newArray;
};

export default func;