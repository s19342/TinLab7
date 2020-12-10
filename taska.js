const calculator = require('./calculator');
const http = require('http');
const url = require('url');
const port = 3000;

var server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const urlQuery = parsedUrl.query;
    const number1 = Number(urlQuery.num1);
    const number2 = Number(urlQuery.num2);

    let calculatedResult = 0;
    let operation = "";
  
    if(!(number1 && number2)){
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write("<h1>Incorrect type of query parameters entered. Please enter only numbers<h1>");
        res.end();
    }else{
        if (parsedUrl.pathname === "/add") {
            operation = "+";
            calculatedResult = calculator.add(number1, number2);
          } else if (parsedUrl.pathname === "/sub") {
            operation = "-";
            calculatedResult = calculator.sub(number1, number2);
          } else if (parsedUrl.pathname === "/mul") {
            operation = "*";
            calculatedResult = calculator.mul(number1, number2);
          } else if (parsedUrl.pathname === "/div") {
            operation = "/";
            calculatedResult = calculator.div(number1, number2);
          } else {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.write(
              "<h1>Please select either add, sub, div or multiply in pathname<h1>"
            );
            res.end();
            return;
          }

          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(`<h1>Calculated result for ${number1} ${operation} ${number2} is ${calculatedResult}<h1>`);
          res.end();
        }
    }
  );

server.listen(port);

console.log(`Listening on port ${port}`);