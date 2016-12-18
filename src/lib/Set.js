const Set = function(array) {
  this.obj = {};
  if(array) {
    this.add(array);
  }
};

Set.prototype = {
  contains : function(v) {
    return this.obj[v] === 1;
  },
  add : function(array){
    var i, len, v;
    for (i = 0, len = array.length; i < len; i++) {
      v = array[i];
      this.obj[v] = 1;
    }
  }
}

module.exports = Set;
