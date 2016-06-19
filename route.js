
function route( pathname, handler, request, response) {

    if ( typeof handler[pathname] == 'function'){

        console.log( "Pathname: " + pathname );

        return handler[pathname]( request, response );

    } else {

        response.writeHead(200,{
            "Content-Type": "text/html"
        });
        response.write( "404 Not Found." );
        response.end();
    }
}

exports.route = route;

