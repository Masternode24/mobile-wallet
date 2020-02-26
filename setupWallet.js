const terms = require("./terms.js");
import Spinner from "./utils/spinner.js";

async function loadTerms(store) {
  try {
    const response = await fetch('https://raw.githubusercontent.com/velas/JsWallet/master/TERMS.md');
    store.current.termsMarkdown = await response.text();
  }catch(e) {
    console.error(e);
    setTimeout(loadTerms.bind(this, store), 1000);
  }
}

module.exports = (store, web3t) => {
  store.current.termsMarkdown = terms;
	//loadTerms(store);
  store.current.page = "terms";
  web3t.init(function(err, data) {

      if (err) {
          spinner.finish();
          store.current.page = "error";
          store.current.error = err + "";
          return;
      }
      const spinner = new Spinner(store, `Setting up your wallet`);

      web3t.refresh(function(err, data){
        spinner.finish();
        if (err) {
          store.current.page = "error";
          store.current.error = err + "";
        }
      });
    });

}