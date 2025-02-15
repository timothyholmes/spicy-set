const { SpicySetDef } = require('./SpicySet');
const Key = require('./UnsortedKey');

class UnsortedSpicySetDef extends SpicySetDef {
  constructor(iterator) {
    super();
    this.items.clear();
    for (const it of iterator) {
      this.add(it);
    }
    this.size = this.items.size;
  }

  has(candidate) {
    const key = JSON.stringify(new Key(candidate).target);
    return this.items.has(key);
  }

  add(candidate) {
    if (!this.has(candidate)) {
      this.items.set(JSON.stringify(new Key(candidate).target), candidate);
    }
    return this;
  }
}

function UnsortedSpicySet(iterable = []) {
  return new UnsortedSpicySetDef(iterable);
}

module.exports = UnsortedSpicySet;
