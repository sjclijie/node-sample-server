
var http = require("http");
var url  = require("url");
var qs = require("querystring");
var formidable = require("formidable");

function run( route, handler ){

    function onRequest( request, response ){

        var pathname =  url.parse(request.url).pathname;
        //var get = qs.parse( url.parse(request.url).query );
        //var post = '';

        if ( pathname == '/favicon.ico' ){
            return;
        }

        //console.log("Get数据: "+ JSON.stringify(get) );

        //解析post
        /*
        request.addListener( "data", function( postDataTrunk ){
            post += postDataTrunk;
        } );
        */

        /*
        request.addListener( "end", function(){
            //post = qs.parse( post );
            route( pathname, handler, request, response );
        } );
        */

        route( pathname, handler, request, response );
    }

    http.createServer( onRequest ).listen(9999);

    console.log("server has started.") ;
}

exports.run = run;


