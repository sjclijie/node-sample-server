
var start = require("./start.js");
var route = require("./route.js");
var requestHandlers = require("./requestHandlers.js");

var handler = {};
handler["/"] = requestHandlers.start;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload;
handler["/show"] = requestHandlers.show;

start.run( route.route, handler );


