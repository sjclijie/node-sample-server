var exec = require( "child_process").exec;
var formidable = require( "formidable" );
var fs = require( "fs" );
var path = require( "path" );
var url  = require( "url" );
var qs = require( "querystring" );

function start( request, response ){

    var body = '<html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<meta title="测试post数据">' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="head_pic">' +
        '<textarea name="text" rows="20" cols="60">' +
        '</textarea>' +
        '<input type="submit" value="提交" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200,{"Content-Type": "text/html"} );
    response.write( body );
    response.end();

    console.log( "Request handler 'start' was called." );
}

function upload( request, response ){

    var form = new formidable.IncomingForm();

    form.parse( request, function( err, fields, files ){

        console.log( "parse done." );

        var filename = path.basename( files.head_pic.path );
        var filepath = path.join( "/tmp/", filename );
        console.log( filepath );

        fs.renameSync( files.head_pic.path, filepath );

        console.log( "-------------\r\n" );
        //console.log( fields );
        console.log( files.head_pic.path );
        console.log( files.head_pic.type );
        console.log( "-------------\r\n" );

        response.writeHead(200,{"Content-Type": "text/html"} );
        response.write( "你提交的数据是: " + JSON.stringify( fields ) );
        response.end( "<a href='/show?name="+ filename +"&type="+files.head_pic.type+"' target='_blank'>查看</a>" );
    });
}

function show( request, response ){

    var filename = qs.parse(url.parse( request.url).query).name ;
    var filepath = path.join( "/tmp", filename );
    var filetype = qs.parse(url.parse(request.url).query).type;

    fs.readFile( filepath, "binary", function( error, file ){
        if ( error ){
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write( error + "\n" );
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": filetype});
            response.write( file, "binary" );
            response.end();
        }
    } );

    console.log( filepath );
}

exports.start = start;
exports.upload = upload;
exports.show = show;