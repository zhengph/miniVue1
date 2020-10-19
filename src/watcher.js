class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    // 保存this
    Dep.target = this
    // 保存旧值
    this.oldValue = this.getVMValue(vm, expr);
    // 清空Dep.target
    Dep.target = null
  }

  update(){
    let oldValue = this.oldValue;
    let newValue = this.getVMValue(this.vm, this.expr)
    if(newValue !== oldValue){
      this.cb(newValue, oldValue)
    }
  }
  // 这个方法用于获取VM中的数据
  getVMValue(vm, expr) {
    let data = vm.$data;
    expr.split('.').forEach(key => {
      data = data[key];
    })
    return data;
  }
}

/* dep对象用于管理所有的订阅者和通知这些订阅者 */
class Dep {
  constructor(){
    this.subs = []
  }

  // 订阅者
  addSub(watcher){
    this.subs.push(watcher);
  }

  // 通知
  notify(){
    this.subs.forEach(sub => {
      sub.update()
    });
  }
}