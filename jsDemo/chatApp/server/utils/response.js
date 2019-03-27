let resp = {};

resp.sendResponse = (req, res, result,connection) => {
    let sendResult = {};

    res.writeHead(result.error_codes.code, { "Content-Type": "application/json" });

    if (result.error_codes.code != 200)
        sendResult['message'] = result.error_codes.message;
    else {
        sendResult = result;
        delete sendResult['error_codes']
    }
    console.log(sendResult)

    res.write(JSON.stringify(sendResult));
    
    if (connection)
        connection.close();
    res.end();
}
module.exports = resp;
