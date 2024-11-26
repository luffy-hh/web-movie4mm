import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

const LivePlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // useEffect(() => {
  //   // Set isPlaying to true when component mounts
  //   setIsPlaying(true);
  //
  //   // Cleanup function to stop playing when the component unmounts
  //   return () => {
  //     // console.log("unmounted");
  //
  //     setIsPlaying(false);
  //   };
  // }, []);

  const handleRetry = () => {
    setIsPlaying(false); // Pause playback
    setTimeout(() => {
      // setRetryCount((prev) => prev + 1); // Increment retry count
      setIsPlaying(true); // Retry playback
    }, 3000); // Retry after 3 seconds
  };

  return (
    <>
      <ReactPlayer
        url={url}
        playing={isPlaying}
        controls={true}
        width={"100%"}
        height={"auto"}
        onError={() => {
          handleRetry();
        }}
      />
    </>
  );
};
LivePlayer.propTypes = {
  url: PropTypes.string.isRequired,
};
export default LivePlayer;
