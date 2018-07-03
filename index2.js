'use strict';

const YouTube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
const Lyrics_URL = 'https://orion.apiseeds.com/api/music/lyric';



// Lyrics handling

function getLyricsData(artist, track, callback) {
  const query = {
    apikey:`oK4BjTgWNvSOZObSdtkDUIT9ERJyR53WYqetVDZvVi4ynNhHAENoybpyN3K5tmQl`,
  }
  $.getJSON(`${Lyrics_URL}/${artist}/${track}`, query, callback);
}

function renderLyricsHtml(result) {
  return `
      <h3>${result.track.name}</h3>
      <p class="byName">Lyrics by: ${result.artist.name}</p>
        <pre>${result.track.text}</pre>
        <p class="copyright">${result.copyright.text}</p> 
  `;
}

function LyricsDataCallback(data) {
    const results = renderLyricsHtml(data.result);
  $('.lyrix').html(results);
}





//Video handling

function getVideoData(searchTerm, callback) {
  const settings = {
    url: YouTube_Search_URL,
    data: {
      q: `${searchTerm} in:name`,
      part: 'snippet',
      per_page: 5,
      key: 'AIzaSyCJUNC_Bo_DvZJgUU3P_p4dXVfZhtv1nLI',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderVideoHtml(result) {
  return `
    <p><a data-fancybox class="iframe" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="videoThumbnail" src="${result.snippet.thumbnails.high.url}" border="0" alt="${result.snippet.title}"/></a></p>
     <h3>
      <a data-fancybox class="js-result-title" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
    </h3>
    <p>
      <a class="channelLink" title="visit this youtube channel" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank"><i class="fab fa-youtube"></i> Visit Channel</a>
    </p>  
  `;
}

function VideoDataCallback(data) {
    const results = data.items.map((item, index) => renderVideoHtml(item));
  $('.vidz').html(results);
}



//a11y tweak to unhide the results area

function toggleHiddenAttr() {
  $('section').prop('hidden', false);
}


//Launch functionality

function beginSearch() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryArtist = $(event.currentTarget).find('.js-artist');
    const querySong = $(event.currentTarget).find('.js-song');
    const artist = queryArtist.val();
    const song = querySong.val();    
    queryArtist.val("");
    querySong.val("");
    getLyricsData(artist, song, LyricsDataCallback);
    getVideoData(song, VideoDataCallback);
    toggleHiddenAttr();
  });
}

$(beginSearch);
