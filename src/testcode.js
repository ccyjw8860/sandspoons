const video = {
  comments: [{ commentor: "1234", context: "hi?" }],
};
video.comments = [
  ...video.comments,
  { commentor: "new commentor", context: "new hI?" },
];
console.log(video);
