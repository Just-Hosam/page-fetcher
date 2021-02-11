const request = require('request');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let args = process.argv.slice(2);

request(`${args[0]}`, (error, response, body) => {
  fs.stat(`${args[1]}`, (err, stat) => {
    if (err === null) {
      rl.question('Do you want to overwrite the data? ', answer => {
        if (answer === 'y') {
          if (response.statusCode !== 200) {
            console.log('Problem getting data from URL', error);
          } else {
            fs.writeFile(`${args[1]}`, body, function (err) {
              if (err) throw err;
        
              fs.stat(`${args[1]}`, (err, stat) => {
                console.log(`Downloaded and saved ${stat.size} bytes to ${args[1]}`);
                process.exit();
              });
            });
          }
        } else {
          console.log('Program done!');
          process.exit();
        }
      })
    } else {
      console.log('File does not exist!');
      process.exit();
    }
  });
});