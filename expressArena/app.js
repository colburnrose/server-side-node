const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pepperoni", (req, res) => {
  res.send("We have all the pepperonis!");
});

app.get("/pineapple", (req, res) => {
  res.send("We fresh Pineapples!");
});

// Request Object properties
app.get("/echo", (req, res) => {
  const responseText = `Here are some details of the request:
    Base URL: ${req.baseUrl},
    Body: ${req.body},
    Host: ${req.hostname},
    Method: ${req.method},
    Path: ${req.path}`;
  res.send(responseText);
});

// Query Object
app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); // do not send any data back to the client.
});

app.get("/greetings", (req, res) => {
  // grab values from request
  const { name, race } = req.query;

  // validate values from request
  if (!name) {
    return res.status.send("Please provide a name for request!");
  }
  if (!race) {
    return res.status.send("Please provide a race with request!");
  }
  const greetings = `Greeting ${name} and ${race}, welcome to our kingdom!`;

  res.send(greetings);
});

// Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values.
// Return a string in the format "The sum of a and b is c".
// Note that query parameters are always strings so some thought should be given to converting them to numbers.
app.get("/sum", (req, res) => {
  const valA = parseInt(req.query.valA);
  const valB = parseInt(req.query.valB);

  if (!valA) {
    return res.status(400).send("Please provide a value for a to sum.");
  }

  if (!valB) {
    return res.status(400).send("Please provide a value for b to sum.");
  }

  let c = valA + valB;
  let sum = `The sum of ${valA} and ${valB} is ${c}`;

  res.status(200).send(sum);
});

// Create an endpoint /cipher. The handler function should accept a query parameter named text and one named shift.
// Encrypt the text using a simple shift cipher also known as a Caesar Cipher. It is a simple substitution cipher where each letter is shifted a certain number of places down the alphabet.
// So if the shift was 1 then A would be replaced by B, and B would be replaced by C and C would be replaced by D and so on until finally Z would be replaced by A.
// using this scheme encrypt the text with the given shift and return the result to the client. Hint - String.fromCharCode(65) is an uppercase A and 'A'.charCodeAt(0) is the number 65. 65 is the integer value of uppercase A in UTF-16. See the documentation for details.

// CIPHER GET with @params {text, shift}
app.get("/cipher", (req, res) => {
  // query param
  const { text, shift } = req.query;
  let num = parseInt(shift);
  // validation: both values are required.
  if (!text) {
    return res.status(400).send("Please provide a value for text to decipher.");
  }

  if (!num || isNaN(num)) {
    return res
      .status(400)
      .send("Please provide a number for shift to perform cipher.");
  }
  // char code
  let textArr = text.split("");
  // letter and create an array of characters
  let shiftedArr = textArr
    .map((letter) => letter.charCodeAt(0) + num)
    .map((number) => String.fromCharCode(number));
  let trimStr = shiftedArr.join("");

  let caeserCipher = `The encrpyted cipher is ${trimStr}`;
  res.status(200).send(caeserCipher);
});

// To send an array of values to the server via a query string simply repeat the key with different values.
// For instance, the query string ?arr=1&arr=2&arr=3 results in the query object { arr: [ '1', '2', '3' ] }.
// Create a new endpoint /lotto that accepts an array of 6 distinct numbers between 1 and 20 named numbers.
// The function then randomly generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly generated numbers to determine how many match. If fewer than 4 numbers match respond with the string "Sorry, you lose".
// If 4 numbers match respond with the string "Congratulations, you win a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!".
// LOTTO GET @params
app.get("/lotto", (req, res) => {
  // VALIDATION: numbers array must exist, must be an array, must be six numbers, and between 1 and 20
  const lotto_nums = req.query.arr;
  // array must exist
  if (!lotto_nums) {
    return res.status(400).send("Provide a set of six numbers");
  }
  // must be an array of numbers
  if (!Array.isArray(lotto_nums)) {
    return res.status(400).send("Provide set of numbers in an array.");
  }
});

app.listen(8000, () => {
  console.log("Express Server is listening on port 8000!");
});
