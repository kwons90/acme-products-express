// Utility function for creating promisifed delays. Can choose to resolve or reject.
const delay = (time, fail = false) =>
  new Promise((res, rej) => {
    setTimeout(fail ? () => rej(new Error('Delay')) : () => res('Delay'), time);
  });

export default delay;
