<script>
/* js의 내장값인 Map/ Set 은 사용자 정의 객체로도 이터러블하게 프로그래밍이 가능하다 */

let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

_.go(
  m,
  _.filter(([k, v]) => v % 2),
  entries => new Map(entries),
  console.log
)

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

console.log([...s])
const add = (a, b) => a + b;
console.log(_.reduce(add, s))

</script>

<script>
/*
 객체 지향과 함수형프로그래밍의 조화
 명령형 프로그래밍을 이터러블하게 바꾼다
 for statement, if statement 대신 map 이나 filter를 사용..
 추상화된 프로그래밍 언어 문법(for, if) 자체를 대체하는것
*/
class Model {
  constructor(attrs = {}){
    this._attrs = attrs;
  }
  get(k){
    return this._attrs[k];
  }
  set(k, v){
    this._attrs[k] = v;
    return this;
  }
}
class Collection {
  constructor(models = []){
    this._models = models;
  }
  at(idx){
    return this._models[idx]
  }
  add(model){
    this._models.push(model)
    return this
  }
  *[Symbol.iterator](){
    yield *this._models;
    /*
    [Symbol.iterator](){
      return this._models[Symbol.iterator]();
    }
    */
    /*
    for(const model of this._models){
      yield model
    }
    */
  }
}

/* OOP */
const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA'}));
coll.add(new Model({ id: 3, name: 'BB'}));
coll.add(new Model({ id: 5, name: 'CC'}));

console.log(coll)
console.log(coll.at(2).get('name'))
console.log(coll.at(1).get('id'))

/* Iterable */

_.go(
  /*
  L.range(3),
  L.map(i => coll.at(i)),
  */
  coll,
  L.map(m => m.get('name')),
  _.each(console.log)
)

_.go(
  coll,
  _.each(m => m.set('name', m.get('name').toLowerCase()))
)
console.log(coll)
</script>

<script>
/* 이터러블 함수의 조합으로 메서드를 생성 */
  class Product extends Model {}
  class Products extends Collection {
    totalPrice(){
      return _.go(
        this,
        L.map(p => p.get('price')),
        _.reduce((a, b) => a + b)
      )
      /* return _.reduce((a, b) => a + b, L.map(p => p.get('price'), this)) */
      /*
        let total = 0;
        this._models.forEach(product => {
          total += product.get('price');
        })
        return total
      */
    }
  }
  const products = new Products();
  products.add(new Product({id: 1, price: 10000 }))
  console.log(products.totalPrice());
  products.add(new Product({id: 3, price: 30000 }))
  console.log(products.totalPrice());
  products.add(new Product({id: 5, price: 50000 }))
  console.log(products.totalPrice());

</script>
