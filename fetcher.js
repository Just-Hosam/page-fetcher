const request = require('request');
const fs = require('fs');

let args = process.argv.slice(2);
console.log(args[1]);

request(`${args[0]}`, (error, response, body) => {
  fs.writeFile(`${args[1]}`, body, function (err) {
    if (err) throw err;
    
    let fileSize = fs.statSync(`${args[1]}`).size;
    console.log(`Downloaded and saved ${fileSize} bytes to ${args[1]}`)
  });
});