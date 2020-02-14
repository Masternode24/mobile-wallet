// Generated by LiveScript 1.5.0
(function(){
  var window, pages, saved, oldseed, transaction, scrollTop, getPage, initControl, focusControl, toString$ = {}.toString;
  window = require('./browser/window.js');
  pages = {};
  saved = require('./seed.js').saved;
  oldseed = require('./oldseed.js');
  transaction = require('mobx').transaction;
  scrollTop = require('./scroll-top.js');
  getPage = function(store, page, prev){
    var stage2;
    if (page !== ':init') {
      return page;
    }
    if (prev === 'newseed') {
      return 'terms';
    }
    stage2 = !saved();
    if (stage2) {
      store.current.seed = oldseed();
    }
    if (stage2) {
      return 'newseed';
    }
    return 'wallets';
  };
  initControl = function(scope, name, cb){
    var control;
    control = pages[name];
    if (toString$.call(control != null ? control.init : void 8).slice(8, -1) !== 'Function') {
      return cb(null);
    }
    return control.init(scope, cb);
  };
  focusControl = function(scope, name, cb){
    var control;
    scrollTop();
    control = pages[name];
    if (toString$.call(control != null ? control.focus : void 8).slice(8, -1) !== 'Function') {
      return cb(null);
    }
    return control.focus(scope, cb);
  };
  module.exports = function(store, web3t, page){
    if (store == null) {
      return alert("store is required");
    }
    if (web3t == null) {
      return alert("web3t is required");
    }
    scrollTop();
    return setTimeout(function(){
      var prev, name;
      prev = store.current.page;
      store.current.page = 'loading';
      store.current.loading = true;
      name = getPage(store, page, prev);
      return initControl({
        store: store,
        web3t: web3t
      }, name, function(){
        store.current.page = name;
        store.current.loading = false;
        return focusControl({
          store: store,
          web3t: web3t
        }, name, function(){});
      });
    }, 1);
  };
}).call(this);
