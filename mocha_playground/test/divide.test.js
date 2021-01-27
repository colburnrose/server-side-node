const isEven = require("../index");
const chai = require("chai");

const expect = chai.expect;

// describe('A SUITE DESCRIPTION', () => {
//     // define test specs here
// })

// describe("Sort function", () => {
//   it("should sort array in ascending order", () => {
//     //spec code here
//     const arr1 = [],
//       arr2 = [];
//     expect(sort(arr1)).to.deep.equal(arr2);
//   });
// });

// describe("Array diff", () => {
//   it("should return a if no common elements", () => {
//     expect(diff([1, 2, 3], [4, 5, 6])).to.deep.equal([1, 2, 3]);
//   });

//   it("should return [] if same", () => {
//     expect(diff([1, 2, 3], [1, 2, 3])).to.deep.equal([]);
//   });

//   it("should return correctly if some elements are removed", () => {
//     expect(diff([1, 2, 3], [2])).to.deep.equal([1, 3]);
//   });
// });

// describe("Array sum", () => {
//   it("should return a promise", () => {
//     expect(sum([1, 2, 3])).to.be.a("promise");
//   });
//   it("should sum an array of numbers", () => {
//     return sum([1, 2, 3]).then((ans) => {
//       expect(ans).to.equal(6);
//     });
//   });
// });

describe("isEven", () => {
  it("should find 4 to be even", () => {
    expect(isEven(4)).to.be.true;
  });

  it("should find 5 to not be even", () => {
    expect(isEven(5)).to.be.false;
  });
});
