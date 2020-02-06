require! {
    \./new-account.js
    \./refresh-wallet.js
    \mobx : { toJS, transaction }
    \prelude-ls : { map, pairs-to-obj }
    \./mirror.js
    \./apply-transactions.js
}
export set-account = (web3, store, cb)->
    err, account <- new-account store, store.current.seed
    return cb err if err?
    store.current.account = account
    mirror.account-addresses =
        account.wallets 
            |> map -> [it.coin.token, it.address] 
            |> pairs-to-obj
    cb null
export refresh-account = (web3, store, cb)-->
    err <- set-account web3, store
    return cb err if err?
    #err, name <- web3.get-account-name store
    #store.current.account.account-name = 
    #    | not err? => name 
    #    | _ => "Anonymous"
    store.current.account.account-name = "Anonymous"
    account-name = store.current.account.account-name
    store.current.nickname = "" if account-name isnt "Anonymous"
    store.current.nicknamefull = account-name if account-name isnt "Anonymous"
    refresh-wallet web3, store, cb
export background-refresh-account = (web3, store, cb)->
    store.current.refreshing = yes
    bg-store = toJS store
    #err, coins <- get-coins
    #return cb err if err?
    #bg-store.coins = coins
    err <- refresh-account web3, bg-store
    store.current.refreshing = no
    return cb err if err?
    state =
        err: null
        data: null
    transaction ->
        try 
            store.rates = bg-store.rates
            store.current.account = bg-store.current.account
            store.current.filter.length = 0
            store.current.filter.push \IN
            store.current.filter.push \OUT
            store.current.filter.push bg-store.current.account.wallets[store.current.wallet-index].coin.token
            store.current.balance-usd = bg-store.current.balance-usd
            store.transactions = bg-store.transactions
            apply-transactions store
        catch err
            state.err = err 
    cb state.err
    