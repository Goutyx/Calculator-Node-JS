const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<head><title>Calculator</title></head>");
    res.write("<h1>Welcome To My Calculator Website</h1>");
    res.write('<a href="/calculator">Go to Calculator</a>');
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-type", "text/html");
    res.write("<head><title>Calculator</title></head>");
    res.write("<h1>Calculator</h1>");
    res.write("<form action='/calculator-result' method='POST'>");
    res.write("<label>Enter first number: </label><br>");
    res.write("<input type='number' name='num1' placeholder='Enter here'><br>");
    res.write("<label>Enter second number: </label><br>");
    res.write(
      "<input type='number' name='num2' placeholder='Enter here'><br><br>"
    );
    res.write("<input type='submit' value='Submit'><br>");
    res.write("</form>");
    return res.end();
  } else if (req.url === "/calculator-result" && req.method === "POST") {
    const body = [];

    req.on("data", (chunks) => {
      body.push(chunks);
    });

    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log("Raw form data:", fullBody);

      const params = new URLSearchParams(fullBody);
      const a = parseFloat(params.get("num1"));
      const b = parseFloat(params.get("num2"));
      const c = a + b;
      console.log("Sum:", c);

      res.setHeader("Content-type", "text/html");
      res.write("<head><title>Calculator Result</title></head>");
      res.write(`<h1>The sum of ${a} and ${b} is ${c}</h1>`);
      return res.end();
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
});
