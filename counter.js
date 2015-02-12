
//increase the counts
module.exports.increaseCount = function(numConnections) {

  console.log('new visitor! increasing count!');
   this.numConnections = numConnections + 1;
   return this.numConnections;
} 

//report counts
module.exports.reportCount = function(count) {
  this.count = count + 1;

  console.log('TOTAL COUNT:', this.count);
  return this.count;
}

