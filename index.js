
class TreeStore {
  constructor(items) {
    this.items = items;
    this.mapOfItems = this.createMapFromItems();
  }

  getAll() {
    return this.items;
  }

  getItem(id) {
    return this.mapOfItems[id];
  }

  getChildren(id) {
    return this.items.filter(item => item.parent === id);
  }

  getAllChildren(id) {
    const result = [];
    const stack = this.getChildren(id);

    while (stack.length > 0) {
      const current = stack.pop();
      result.push(current);
      const children = this.getChildren(current.id);
      stack.push(...children);
    }

    return result;
  }

  getAllParents(id) {
    const result = [];
    let current = this.getItem(id);

    while (current) {
      result.push(current);
      current = this.getItem(current.parent);
    }

    result.shift();
    return result;
  }

  createMapFromItems() {
    return this.items.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
  }

}


const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);
console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));