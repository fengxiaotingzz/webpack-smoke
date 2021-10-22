const glob = require("glob");
const path = require("path");

describe("Checking generated html file", () => {
  it("should generate html file", (done) => {
    const files = glob.sync(path.join(__dirname, "../../dist/index.html"));

    if (files.length > 0) {
      done();
    } else {
      throw new Error("not found index.html");
    }
  });
});
