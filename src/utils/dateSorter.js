const func = (objs) => {
  const newArr = objs.map((el) => {
    const date = new Date(el.createdAt);
    el.newDate = date.getDate();
    el.newHour = date.getHours();
    el.newLocalDate = date.toLocaleDateString();
    el.newTime = date.toLocaleTimeString();
    el.localTime = date.toLocaleString();
    delete el.createdAt;
    return el;
  });

  return newArr;
};

export default func;
