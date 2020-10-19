// 创建一个类，实现实例
class Vue {
  constructor(options = {}) {
    // 添加属性
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods

    // 监视data中的数据
    new Observer(this.$data)
    // 代理 vm.$data.msg => vm.msg
    this.proxy(this.$data);
    this.proxy(this.$methods)
    // 如果指定el，对el解析
    if (this.$el) {
      // compile 负责解析模板内容
      // 需要模板，数据
      new Compile(this.$el, this)
    }
  }

  proxy(data) {
    Object.keys(data).forEach(key => {
      // this 是 vm
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] == newValue) {
            return
          }
          data[key] = newValue

        }
      })
    })
  }
}