
let times = 0

const syncDB = () => {
  times++
  console.log('tick cada 5 segundos', times);

  return times
}

module.exports = {
  syncDB
}