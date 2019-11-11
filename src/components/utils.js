export const formatToHtml = notes => {
  return 'formatToHTML';
};

export const formatToText = notes => {
  return 'formatToText';
};

export const formatToMarkdown = notes => {
  return 'formatToMarkdown';
};

export const copyToClipBoard = el => {
  el.select();
  document.execCommand('copy');
};

export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden'
};

export const formatTime = duration => {
  var ms = parseInt(duration * 1000),
    s = parseInt((ms / 1000) % 60),
    m = parseInt((ms / (1000 * 60)) % 60),
    h = parseInt((ms / (1000 * 60 * 60)) % 24);

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  return h + ':' + m + ':' + s;
};
