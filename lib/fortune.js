var fortunes = [
  {
    author: "James Thurber",
    quote: "Let us not look back in anger or forward in fear, but around in awareness."
  },
  {
    author: "Clay Shirky",
    quote: "It used to be expensive to make things public and cheap to make them private. Now it’s expensive to make things private and cheap to make them public."
  },
  {
    author: "Bruce Schneier",
    quote: "The user's going to pick dancing pigs over security every time."
  },
  {
    author: "Kahlil Gibran",
    quote: "If you reveal your secrets to the wind, you should not blame the wind for revealing them to the trees."
  },
  {
    author: "Gosser",
    quote: "Securing a computer system has traditionally been a battle of wits: the penetrator tries to find the holes, and the designer tries to close them."
  },
  {
    author: "Client4",
    quote: "Try harder."
  }
];

exports.getFortune = function() {
  var idx = Math.floor(Math.random() * fortunes.length);
  return fortunes[idx];
};
