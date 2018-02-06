export const playAudio = (type) => {
  const au = document.querySelector(`audio[data-audio=${type}]`);
  if (au) {
    au.play();
  }
};
