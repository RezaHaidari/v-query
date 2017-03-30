const $ = require('./lib')


export default  {

  install(Vue, options) {
    //inject $v object into Vue Instances 
    Vue.prototype.$v = function(query) {
      // return query selector from virtual dom 
      return $(query,this.$el)
    }
  }
};