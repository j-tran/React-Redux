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
    // callback function returns videos from search
    YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
      this.setState({
        videos, // ES6 syntax. Otherwise would need "videos: videos"
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          // callback takes selected video as a param since we need a reference to pass back up to the parent
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.querySelector('.container'));
