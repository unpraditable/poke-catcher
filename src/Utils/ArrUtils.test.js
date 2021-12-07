import ArrUtils from "./ArrUtils";

describe("ArrUtils", () => {
  it("groupBy", () => {
    const arr = [
      {
        id: 4,
        name: "charmander",
        nickName: "Char",
      },
      {
        id: 3,
        name: "venusaur",
        nickName: "Char",
      },
      {
        id: 10,
        name: "caterpie",
        nickName: "Cater",
      },
    ];
    expect(ArrUtils.groupBy(arr, "name")).toEqual({
      caterpie: [{ id: 10, name: "caterpie", nickName: "Cater" }],
      charmander: [{ id: 4, name: "charmander", nickName: "Char" }],
      venusaur: [{ id: 3, name: "venusaur", nickName: "Char" }],
    });
  });
});
