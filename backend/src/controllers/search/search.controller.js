//Require Express
var express = require( 'express' );
//Require Request Service
const GETRequest  = require( '../../services/services' );
module.exports = {
    querySearch : ( req, res ) => {
        let query = req.query.q;
        if( !!query ) {
            GETRequest( `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4` )
            .then( async ( dataReturn ) => {
                const body = await JSON.parse( dataReturn );
                const { results } = body;
                const send = {
                    author : { name: 'Lucas', lastname: 'Campos de Souza' },
                    categories: [],
                    items: []
                };
                for( x of results ) {
                    var category_id = x.category_id;
                    const category_name = category_id;
                    send.items.push( {
                        "id": x.id,
                        "title": x.title,
                        "price": {
                            "currency": x.currency_id,
                            "amount": x.price,
                            "decimals": x.price
                        },
                        "picture": x.thumbnail,
                        "condition": x.attributes[0].value_name,
                        "free_shipping": x.shipping.free_shipping,
                        "direction" : x.address.city_name
                    } )
               };
                //Get TAGS
                GETRequest( `https://api.mercadolibre.com/categories/${category_id}` )
                .then( ( e ) => {
                    const data = send;
                    const { path_from_root } = JSON.parse( e );
                    for( y of path_from_root ) { data.categories.push( y.name ); }
                    res.send( data );
                } )
                .catch( console.log );
            })//End then
            .catch( console.log )
        }//End if
    },
    queryPreview : ( req, res ) => {
        var id = req.params.id;
        GETRequest( `https://api.mercadolibre.com/items/${id}` )
        .then( ( e ) => {
            e = JSON.parse( e );
            var category_id = e.category_id;
            const send = {
                author : { name: 'Lucas', lastname: 'Campos de Souza' },
                id: e.id,
                title: e.title,
                categories: [],
                price: {
                        currency: e.currency_id,
                        amount: e.price,
                        decimals: e.price,
                },
                picture: e.pictures,
                condition: e.attributes[ 2 ].value_name,
                free_shipping: e.shipping.free_shipping,
                sold_quantity: e.sold_quantity,
                description: e.descriptions[ 0 ].id.split( '-' )[ 0 ]
            };
            //Get DESCRIPTION
            GETRequest( `https://api.mercadolibre.com/items/${send.description}/description` )
            .then( ( e ) => {
                const data = send;
                const { plain_text } = JSON.parse( e );
                data.description = plain_text;
                //Get TAGS
                GETRequest( `https://api.mercadolibre.com/categories/${category_id}` )
                .then( ( e ) => {
                    const dataCategory = data;
                    const { path_from_root } = JSON.parse( e );
                    for( y of path_from_root ) { dataCategory.categories.push( y.name ); }
                    res.send( dataCategory );
                } )
                .catch( console.log );
            } )
            .catch( console.log );
        });
    }
}