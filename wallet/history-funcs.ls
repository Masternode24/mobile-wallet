require! {
    \prelude-ls : { sort-by, reverse, filter, map, find }
    \moment
    \./navigate.js
    \react
    \./pending-tx.js : { remove-tx }
    \./web3.js
    \mobx : { toJS }
    \./pages/confirmation.js : { confirm, prompt }
    \./apply-transactions.js
}
module.exports = (store, web3t)->
    return null if not store? or not web3t?
    cut-tx = (tx)->
        return \none if not tx?
        t = tx.to-string!
        r = t.substr(0, 4) + \.. + t.substr(tx.length - 25, 10) + \.. + t.substr(t.length - 4, 4)
        r.to-upper-case!
    ago = (time)->
        moment(time * 1000).from-now!
    date = (time)->
        moment(time * 1000).format!
    filt = store.current.filter
    arrow = (type)->
        | type is \IN => \INC
        | _ => \OUT
    go-back = ->
        navigate store, web3t, \wallets
    extended = (str)->
        | str.index-of('.') > -1 => "#{str}0"
        | _ => "#{str}.0"
    cut-amount = (amount, max)->
        str = (amount ? "")to-string!
        res =
            | str.length is max => str
            | str.length >= max => str.substr(0, max - 1) + ".."
            | _ => cut-amount extended(str), max
        res
    amount-beautify = (amount, max)->
        str = cut-amount amount, max
        data = str.match(/(.+[^0])(0+)$/)
        if not data?
            return
                .pug.balance 
                    span.color.pug #{str}
        [_, first, last] = data
        span.pug.balance
            span.color.pug #{first}
            span.rest.pug #{last}
    is-active = (value)->
        if value in filt then \active else ''
    switch-filter  = (value, event)-->
        if value not in filt
            filt.push value
        else 
            filt.splice(filt.index-of(value), 1)
        apply-transactions store
    switch-type-in = switch-filter \IN
    switch-type-out = switch-filter \OUT
    delete-pending-tx = (tx)-> (event)->
        agree <- confirm store, "Would you like to remove pending transaction? Your balance will be increased till confirmed transaction"
        return if not agree
        err <- remove-tx { store, ...tx }
        #return alert "Cannot Remove Tx. Looks like it is already in blockchain" if err?
        <- web3t.refresh
    { go-back, switch-type-in, switch-type-out, store.coins, is-active, switch-filter, cut-tx, arrow, delete-pending-tx, amount-beautify, ago }