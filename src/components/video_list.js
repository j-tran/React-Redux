import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => { // each videoItems keeps track of its data
  const videoItems = props.videos.map(video =>
    <VideoListItem
      onVideoSelect={props.onVideoSelect}
      key={video.etag}
      video={video}
    />,
  );

  return ( // React knows that videoItems is a list, so will render all in arr
    <ul className="col list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
