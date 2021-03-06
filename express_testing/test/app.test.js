const { expect } = require("chai");
const { json } = require("express");
const supertest = require("supertest");
const app = require("../app");

describe("Express App", () => {
  it("should return a message from GET /", () => {
    return supertest(app).get("/").expect(200, "Hello Express!");
  });
});

// describe("GET /quotient", () => {
//   it("8/4 should be 2", () => {
//     return supertest(app)
//       .get("/quotient")
//       .query({ a: 8, b: 4 })
//       .expect(200, "8 divided by 4 is 2");
//   });
//   it(`should return 400 if 'a' is missing`, () => {
//     return supertest(app)
//       .get("/quotient")
//       .query({ b: 4 })
//       .expect(400, "value is needed for a");
//   });
// });

describe("GET /generate", () => {
  it("should generate an array of 5", () => {
    return supertest(app)
      .get("/generate")
      .query({ n: 5 })
      .expect(200)
      .expect("Content-type", /json/)
      .then((res) => {
        // make sure to get the array
        expect(res.body.initial).to.be.an("array");
        // array must not be empty
        expect(res.body.initial).to.have.lengthOf.at.least(1);
        // the assertion fails
        expect(res.body).to.include.members([1, 2, 3, 4, 5]);
      });
  });

  describe("GET /frequency", (req, res) => {
    // query
    const { s } = req.query;

    if (!s) {
      return res.status(400).send("Invalid request!");
    }

    const counts = s
      .toLowerCase()
      .split("")
      .reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr]++;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {});

    const unique = Object.keys(counts).length;
    const average = s.length / unique;
    let highest = "";
    let highestVal = 0;

    Object.keys(counts).forEach((k) => {
      if (counts[k] > highestVal) {
        highestVal = counts[k];
        highest = k;
      }
    });

    counts.unique = unique;
    counts.average = average;
    counts.highest = highest;
    res.json(counts);
  });
});
