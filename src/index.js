import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCmpxDo1Hmj2G_fm-j3uqIRSnbHkdorOc0';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.videoSearch('surfboards');
  }

  videoSearch(term) { // callback function returns videos from search
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({
        videos, // ES6 syntax. Otherwise would need "videos: videos"
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    /* videoSearch becomes a new function that throttles our search input
    Is used by SearchBar component */
    const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 300);
    console.log(videoSearch);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
          /* callback onVideoSelect is used by video_list_item,
          which calls onVideoSelect(video), after which the state is set to video */
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.querySelector('.container'));
