const data = [
  42,
  "alexanderThomas",
  {
    vehicle: "sedan",
    animal: "elephant",
    ecosystem: {
      sound: "rustling",
      primaryResource: "water",
      biodiversityResearch: [
        {
          researcher: "DrEmilyRamirez",
          observation: "migratorySurvey",
        },
        "conservationData",
      ],
    },
  },
  ["riverValley", "mountainRange", "desertPlain", "coastalRegion"],
];

const customSerializer = (data) => {
  
  let result = ""
  
  if (typeof data === "number") {
    result += "num:" + data;
  }
  
  else if (typeof data === "string") {
    if (data.length <= 2) result += "str:" + data;
    else result += "str:" + data[0] + (data.length-2).toString() + data[data.length - 1];
  }

  else if (Array.isArray(data)) {
    result += "arr:";
    for (let i = 0; i < data.length; i++) {
      result += customSerializer(data[i]);
    }
  }

  else if (typeof data === "object") {
    result += "obj:";
    for (let key in data) {
      result += customSerializer(data[key]);
    }
  }

  else {
    result += "err:unknown";
  }

  return result;


};

const encodedData = customSerializer(data);
console.log(encodedData);
