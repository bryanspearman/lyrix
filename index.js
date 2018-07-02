
// API End Points
const YouTube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
const Lyrics_URL = 'https://orion.apiseeds.com/api/music/lyric';



// API call for lyrics data
function getLyricsData(artist, track, callback) {
  const query = {
    apikey:`oK4BjTgWNvSOZObSdtkDUIT9ERJyR53WYqetVDZvVi4ynNhHAENoybpyN3K5tmQl`,
  }
  $.getJSON(`${Lyrics_URL}/${artist}/${track}`, query, callback);
}


//Create the lyrics HTML
function renderLyrics(result) {
  return `
      <h3>${result.track.name}</h3>
      <h4>By: ${result.artist.name}</h4>
        <p>${result.track.text}</p>
        <p class="copyright">${result.copyright.text}</p> 
  `;
}

//Look over the data and use the renderLyrics function to organize it on the page
function displayLyricsData(data) {
    const results = result.map((item, index) => renderLyrics(item));
  $('.lyrix').html(results);
}



// API call for video data
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


//Create the video HTML
function renderVideos(result) {
  return `
          <p><a data-fancybox class="iframe" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="videoThumbnail" src="${result.snippet.thumbnails.medium.url}" border="0" alt="${result.snippet.title}"/></a></p>
           <h3>
            <a data-fancybox class="js-result-title" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
          </h3>
          <p>
            <a class="channelLink" title="visit this youtube channel" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank"><i class="fab fa-youtube"></i> Visit Channel</a>
          </p>  
  `;
}


//Look over the data and use the renderVideos function to organize it on the page
function displayVideoData(data) {
    const results = data.items.map((item, index) => renderVideos(item));
  $('.vidz').html(results);

}

function beginSearch() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryArtist = $(event.currentTarget).find('.js-artist');
    const querySong = $(event.currentTarget).find('.js-song');
    const artist = queryArtist.val();
    const song = querySong.val();    
    queryArtist.val("");
    querySong.val("");
    getLyricsData(artist, song, displayLyricsData);
    getVideoData(song, displayVideoData);
  });
}



$(beginSearch);
