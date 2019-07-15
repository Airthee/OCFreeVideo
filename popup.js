const scriptCode = `
  (function(){
    // Get source url of the video
    let domVideos = document.getElementsByClassName('video');
    let links = [];
    for(let i = 0, url; i<domVideos.length; i++) {
      url = domVideos[i].dataset.srcOrigine;
      links.push(url);
    }
    return links;
  })();
`;

// i18n
const i18nValues = {
  'en_EN': {
    'popup_titleList_labelNoVideos': 'No video found',
    'popup_titleList_labelVideos': 'Videos',
    'popup_linkList_template': '<li><a target="__blank" href="{url}">{url}</a></li>'
  }
};

/**
 * replaceAll function
 */
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

// Get popup elements
let linkList = document.getElementById('linkList');
let titleList = document.getElementById('titleList');

/**
 * Add vidéos to popup
 * @param {*} videos 
 */
function setVideos(links) {
  titleList.innerHTML = i18n(links.length == 0 ? 'popup_titleList_labelNoVideos' : 'popup_titleList_labelVideos');
  linkList.innerHTML = '';
  links.forEach(link => {
    linkList.innerHTML += i18n('popup_linkList_template').replaceAll('{url}', link);
  });
}

/**
 * Return i18n string
 */
function i18n(key) {
  return i18nValues.en_EN[key];
}

// Runs script when popup is opened
chrome.tabs.executeScript({code: scriptCode}, function(result) {
  setVideos(result[0]);
});