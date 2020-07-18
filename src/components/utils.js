const getVideoUrl = (url, time) => {
  let URL = '';
  let curtime = '' + Math.round(time);
  if (/youtu/.test(url)) {
    const [src, id] = url.split('be/', 2);
    URL = `https://www.youtube.com/watch?t=${curtime.slice(0, 4)}&v=${id}`;
    console.log(src);
  }

  if (/vimeo/.test(url)) {
    const [src, id] = url.split('com/', 2);
    URL = `https://vimeo.com/${id}#t=${curtime.slice(0, 4)}`;
    console.log(src);
  }

  return URL;
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

export const formatToHtml = notes => {
  console.log(notes);
  let links = [];
  links.push('<ul>');
  notes.forEach(({ time, title, url }) => {
    let timecode = formatTime(time * 1000);

    let urlStr = getVideoUrl(url, time);

    let viewLinksFormat = `\t<li><a href="${urlStr}">${timecode} ${title}</a></li>`;
    links.push(viewLinksFormat);
  });
  links.push('</ul>');

  return links.join('\n');
};

export const formatToText = notes => {
  let viewLinks = [];
  let links = [];
  notes.forEach(({ time, title, url }) => {
    let timecode = formatTime(time * 1000);

    let urlStr = getVideoUrl(url, time);

    let viewLinksFormat = `${timecode} ${title} ${urlStr}`;
    viewLinks.push(viewLinksFormat);
  });

  return viewLinks.concat(links).join('\n');
};

export const formatToMarkdown = notes => {
  let viewLinks = [];
  let links = [];
  notes.forEach(({ time, title, url }) => {
    let timecode = formatTime(time * 1000);

    let urlStr = getVideoUrl(url, time);

    let viewLinksFormat = `- [\`${timecode}\`] ${title}`;
    let linksFormat = `[\`${timecode}\`]: ${urlStr}`;
    viewLinks.push(viewLinksFormat);
    links.push(linksFormat);
  });

  return viewLinks.concat(links).join('\n');
};

export const copyToClipBoard = el => {
  el.select();
  document.execCommand('copy');
};
