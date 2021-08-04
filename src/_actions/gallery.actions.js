export const addUpCart = (cart, storePrice, storeTax) => {
    let sum = 0;
    let tax = Number(storePrice * storeTax);
    let price = Number(storePrice);
    for (const image of cart) {
      sum += price + tax;
    }
    return sum.toFixed(2);
}

export const formatTime = (imageTime) => {
    const time = new Date(imageTime);
    const options = { hour: "numeric", minute: "numeric" }
    const fd = new Intl.DateTimeFormat('en-us', options).format(time);
    return fd.toString();
}

export const setTodaysDate = () => {
  let day = new Date();
  let dd = day.getDate()
  let mm = day.getMonth() + 1;
  let yyyy = day.getFullYear();
  if (dd < 10) {
      dd = '0' + dd
  }
  if (mm < 10) {
      mm = '0' + mm
  }
  return yyyy + "-" + mm + "-" + dd;
}
