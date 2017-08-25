export function equals(x, y) {
  console.log(x, y);
  let p;
  for(p in y) {
    console.log(x[p]);
    if(typeof(x[p]) == 'undefined') {
      return false;
    }
  }

  for(p in y) {
    if (y[p]) {
      switch(typeof(y[p])) {
      case 'object':
        if (!y[p].equals(x[p])) {
          return false;
        }
        break;
      case 'function':
        if (typeof(x[p]) == 'undefined' ||
          (p != 'equals' && y[p].toString() != x[p].toString()))
          return false;
        break;
      default:
        if (y[p] != x[p]) {
          return false;
        }
      }
    } else {
      if (x[p])
        return false;
    }
  }

  for(p in x) {
    if(typeof(y[p]) == 'undefined') {
      return false;
    }
  }

  return true;
}
