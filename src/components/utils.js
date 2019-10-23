export const formatToHtml = notes => {
  return 'formatToHTML';
};

export const formatToYouTube = notes => {
  return 'formatToYouTube';
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
