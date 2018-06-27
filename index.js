const YouTube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';

function getVideoData(searchTerm, callback) {
  const settings = {
    url: YouTube_Search_URL,
    data: {
      q: `${searchTerm} in:name`,
      part: 'snippet',
      per_page: 2,
      key: 'AIzaSyCJUNC_Bo_DvZJgUU3P_p4dXVfZhtv1nLI',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
      <div class="searchResult">
        <div class="row">
          <div class="col-4">
           <p><a data-fancybox class="iframe" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}"><img class="videoThumbnail" src="${result.snippet.thumbnails.medium.url}" border="0" alt="${result.snippet.title}"/></a></p>
          </div>
        <div class="col-6">
          <h3>
            <a data-fancybox class="js-result-title" title="opens video ${result.snippet.title}" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
          </h3>
          <p class="postedBy">
            Posted by: <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank" title="author of video"><b>${result.snippet.channelTitle}</b>
          </p>
          <p>
            <a class="channelLink" title="visit this youtube channel" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank"><i class="fab fa-youtube"></i> Visit Channel</a>
          </p>
       </div>
      </div>
    </div>
  `;
}

function displayVideoData(data) {
    const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);

}

function beginSearch() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-search');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getVideoData(query, displayVideoData);
  });
}



$(beginSearch);
