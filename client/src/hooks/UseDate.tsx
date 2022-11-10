import moment from "moment";

const UseDate = () => {
  const date = new Date();
  const hour = moment(date).format('LT')
  const day = moment(date).format('ll')
  
  return `${hour} · ${day}`;
}

export default UseDate;