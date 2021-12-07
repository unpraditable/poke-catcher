import StringUtils from "./StringUtils";

describe("StringUtils", () => {
  it("removeDash", () => {
    const string = "shiny-sobble";
    expect(StringUtils.removeDash(string)).toEqual("shiny sobble");
  });
});
