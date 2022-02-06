import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import Plyr from "plyr";

import Hls from "hls.js";

export default function Home() {
  const source =
    "https://mosa5445.arvanvod.com/7wgbOR1D5G/938e822e54ab3580b7c16df2e9a27e21/1630605797/mrRwL274aY/h_,144_200,240_400,360_800,480_1105,720_1105,k.mp4.list/master.m3u8?secure=true";

  useEffect(() => {
    function init() {
      const video = document.querySelector("video");
      const source = video.getElementsByTagName("source")[0].src;

      // For more options see: https://github.com/sampotts/plyr/#options
      // captions.update is required for captions to work with hls.js
      const defaultOptions = {};

      if (Hls.isSupported()) {
        // For more Hls.js options, see https://github.com/dailymotion/hls.js
        const hls = new Hls();
        hls.loadSource(source);

        // From the m3u8 playlist, hls parses the manifest and returns
        // all available video qualities. This is important, in this approach,
        // we will have one source on the Plyr player.
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          // Transform available levels into an array of integers (height values).
          const availableQualities = hls.levels.map((l) => l.height);

          // Add new qualities to option
          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            // this ensures Plyr to use Hls to update quality level
            forced: true,
            onChange: (e) => updateQuality(e),
          };

          // Initialize here
          const player = new Plyr(video, defaultOptions);
        });
        hls.attachMedia(video);
        window.hls = hls;
      } else {
        // default options with no quality update in case Hls is not supported
        const player = new Plyr(video, defaultOptions);
      }

      function updateQuality(newQuality) {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " + newQuality + 'p');
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }

    init();
  }, []);

  return (
    <div className={styles.container}>
      <video controls crossorigin playsinline style={{
        minWidth: 1280,
        minHeight: 720
      }}>
      <source 
        type="application/x-mpegURL" 
        src={source}
      ></source>
    </video>


    </div>
  );
}
