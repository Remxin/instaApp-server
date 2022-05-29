let photosArr = []
const tagsArr = [
    {
        "id": 0,
        "name": "#love",
        "popularity": 345,
    },
    {
        "id": 1,
        "name": "#instagood",
        "popularity": 345,
    },
    {
        "id": 2,
        "name": "#fashion",
        "popularity": 345,
    },
    {
        "id": 3,
        "name": "#photooftheday",
        "popularity": 345,
    },
    {
        "id": 4,
        "name": "#beautiful",
        "popularity": 345,
    },
    {
        "id": 5,
        "name": "#art",
        "popularity": 345,
    },
    {
        "id": 6,
        "name": "#photography",
        "popularity": 345,
    },
    {
        "id": 7,
        "name": "#happy",
        "popularity": 345,
    },
    {
        "id": 8,
        "name": "#picoftheday",
        "popularity": 345,
    },
    {
        "id": 9,
        "name": "#cute",
        "popularity": 345,
    },
    {
        "id": 10,
        "name": "#follow",
        "popularity": 345,
    },
    {
        "id": 11,
        "name": "#tbt",
        "popularity": 345,
    },
    {
        "id": 12,
        "name": "#followme",
        "popularity": 345,
    },
    {
        "id": 13,
        "name": "#nature",
        "popularity": 345,
    },
    {
        "id": 14,
        "name": "#like4like",
        "popularity": 345,
    },
    {
        "id": 15,
        "name": "#travel",
        "popularity": 345,
    },
    {
        "id": 16,
        "name": "#instagram",
        "popularity": 345,
    },
    {
        "id": 17,
        "name": "#style",
        "popularity": 345,
    },
    {
        "id": 18,
        "name": "#repost",
        "popularity": 345,
    },
    {
        "id": 19,
        "name": "#summer",
        "popularity": 345,
    },
    {
        "id": 20,
        "name": "#instadaily",
        "popularity": 345,
    },
    {
        "id": 21,
        "name": "#selfie",
        "popularity": 345,
    },
    {
        "id": 22,
        "name": "#me",
        "popularity": 345,
    },
    {
        "id": 23,
        "name": "#friends",
        "popularity": 345,
    },
    {
        "id": 24,
        "name": "#fitness",
        "popularity": 345,
    },
    {
        "id": 25,
        "name": "#girl",
        "popularity": 345,
    },
    {
        "id": 26,
        "name": "#food",
        "popularity": 345,
    },
    {
        "id": 27,
        "name": "#fun",
        "popularity": 345,
    },
    {
        "id": 28,
        "name": "#beauty",
        "popularity": 345,
    },
    {
        "id": 29,
        "name": "#instalike",
        "popularity": 345,
    },
    {
        "id": 30,
        "name": "#smile",
        "popularity": 345,
    },
    {
        "id": 31,
        "name": "#family",
        "popularity": 345,
    },
    {
        "id": 32,
        "name": "#photo",
        "popularity": 345,
    },
    {
        "id": 33,
        "name": "#life",
        "popularity": 345,
    },
    {
        "id": 34,
        "name": "#likeforlike",
        "popularity": 345,
    },
    {
        "id": 35,
        "name": "#music",
        "popularity": 345,
    },
    {
        "id": 36,
        "name": "#follow4follow",
        "popularity": 345,
    },
    {
        "id": 37,
        "name": "#makeup",
        "popularity": 345,
    },
    {
        "id": 38,
        "name": "#amazing",
        "popularity": 345,
    },
    {
        "id": 39,
        "name": "#igers",
        "popularity": 345,
    },
    {
        "id": 40,
        "name": "#nofilter",
        "popularity": 345,
    },
    {
        "id": 41,
        "name": "#dog",
        "popularity": 345,
    },
    {
        "id": 42,
        "name": "#model",
        "popularity": 345,
    },
    {
        "id": 43,
        "name": "#sunset",
        "popularity": 345,
    },
    {
        "id": 44,
        "name": "#beach",
        "popularity": 345,
    },
    {
        "id": 45,
        "name": "#instamood",
        "popularity": 345,
    },
    {
        "id": 46,
        "name": "#motivation",
        "popularity": 345,
    },
]

const filters = [
    {
        id: 0,
        name: "rotate",
        args: ["imgId", "x=0-360"]
    },
    {
        id: 1,
        name: "resize",
        args: ["imgId", "w", "h"]

    },
    {
        id: 2,
        name: "reformat",

    },
    {
        id: 3,
        name: "crop"
    },
    {
        id: 4,
        name: "grayscale"
    },
    {
        id: 5,
        name: "flip/flop"
    },
    {
        id: 6,
        name: "negate"
    },
    {
        id: 7,
        name: "tint",
        args: ["r", "g", "b"]
    }
]

const users = []


module.exports = { photosArr, tagsArr, filters, users }