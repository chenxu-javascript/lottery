var local_handle = {
    local_item: "lottery_datas",
    get: function( key ) {
        return window.localStorage.getItem( key ) || ''
    },

    set: function( key, val) {
        window.localStorage.setItem( key, val );
    },
    delete: function(datas, name) {
        var res = [];
        datas.forEach(function(val, index) {
            if (name != val.nameen) {
                res.push(val);
            }
        });
        var new_datas = JSON.stringify(res);
        this.set(this.local_item, new_datas);
        return res;
    },
    clear: function() {
        window.localStorage.clear()
    }
};

export { local_handle };
