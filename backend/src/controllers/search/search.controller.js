var express = require('express');
const GETRequest  = require('../../services/services');
module.exports = {
    querySearch : (req, res) => {
        let query = req.query.q;
        if(!!query) {
            GETRequest(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=2`)
            .then( dataReturn => {
                const body = JSON.parse(dataReturn);
                const { results } = body;
                const send = {
                    author : { name: 'Lucas', lastname: 'Campos de Souza' },
                    categories: [],
                    items: []
                };
                for(x of results){
                    var category_id = x.category_id;
                    const category_name = category_id;
                    send.items.push({
                        "id": x.id,
                        "title": x.title,
                        "price": {
                            "currency": x.currency_id,
                            "amount": x.price,
                            "decimals": x.installments.amount
                        },
                        "picture": x.thumbnail,
                        "condition": x.attributes[1].value_name,
                        "free_shipping": x.shipping.free_shipping,
                        "State" : x.address.city_name
                    })
               };
                //Get TAGS
                GETRequest(`https://api.mercadolibre.com/categories/${category_id}`)
                .then( e => {
                    const data = send;
                    const { path_from_root } = JSON.parse(e);
                    for(y of path_from_root){
                        data.categories.push(y.name);
                    }
                    res.send(data);
                } )
                .catch(console.log);
            })//End then
            .catch( console.log )
        }//End if
    },

    queryPreview : (req, res) => {
        var id = req.params.id;
        request(`https://api.mercadolibre.com/items/${id}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);


                var send = {
                    author : {
                        name: 'Lucas',
                        lastname: 'Campos de Souza',
                    },
                    category_name: [],
                    items: []
                };

                send.items.push({
                    "id": body.id,
                    "title": body.title,
                    "price": {
                        "currency": body.currency_id,
                        "amount": body.price,
                    },
                    "picture": body.thumbnail,
                    "condition": body.attributes[1].value_name,
                    "free_shipping": body.shipping.free_shipping
                })
                
               
                console.log(body)
                
                res.send(send);
            } else { console.log(error) }
        });
    },
    queryPreviewDescription: (req, res) => {
        res.send('11');
    }
}