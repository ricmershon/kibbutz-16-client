
const rawDate = '20201211';
const newString
const dateString = new Date(
  rawDate.slice(0, 4), rawDate.slice(4,6)-1, rawDate.slice(-2)
).toDateString().substring(4)
console.log(dateString.substring(0, dateString.length-5))
