//
// Start the server with node fileupload.js
// Then, upload a large file to the server with e.g. curl:
// curl --upload-file largefiletoupload http://localhost:8100
// The file should be uploaded in chunks and the progress should be
// reported back to the client
//
var http = require('http');
var fs = require('fs');

http.createServer(function(request,response){
    var fileToSave = fs.createWriteStream("uploadedfile");
    var fileSize = request.headers['content-length'];
    var uploadedBytes = 0;

    request.on('readable',function() {
        var chunk = null;
        while( (chunk = request.read()) !== null ){
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileSize) * 100;
            response.write("progress: " + parseInt(progress,10) + "%\n");
        }
    });

    request.on('end',function(){
        response.write("progress: 100%\n");
        response.end();
    })

    request.pipe(fileToSave);

}).listen(8100);
