var request = require('request');
var sf = require('node-salesforce');
/*
var conn = new sf.Connection({
});
exports.getAuthToken = async function () {
    conn.login('georgia@nuffsaid.com', 'n!xHMcFsK#Uh5KZTURBX96FdanS8KnLbSK5Eh59P', function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log("Access token: " ,conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve("foo") // successfully fill promise
    })
};
*/ 

exports.getRecords = async function () {
    var records = [];
    conn.query("SELECT Id, Name, Owner.Name, CreatedDate FROM Account", function(err, result) {
    if (err) { return console.error(err); }
    console.log("total from account : " + result.totalSize);
    records.push({"accounts" : result.records});
        conn.query("SELECT AccountId,CreatedById,CreatedDate,Field,Id,IsDeleted,NewValue,OldValue FROM AccountHistory", function(err, result) {
            if (err) { return console.error(err); }
            console.log("total  from accountHistory: " + result.totalSize);                
        });
    });
    conn.query("SELECT Id, Name, Email, Account.Id FROM Contact", function(err, result) {
        if (err) { return console.error(err); }
        console.log("total from contacts : " + result.totalSize);   
        records.push({"contacts" : result.records})             
    });

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000)
        resolve(records) // successfully fill promise
    })
};

