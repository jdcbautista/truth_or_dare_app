import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "rebass";
import {
  StyledVideoBox,
  StyledVideo,
  StyledAvatar,
  StyledAudioOnIcon,
  StyledAudioOffIcon,
  StyledVideoOnIcon,
  StyledVideoOffIcon,
  StyledVideoIconButton,
  StyledAudioIconButton,
  StyledGameVideo,
  StyledGameVideoBox,
} from "../LobbyStyles";
import * as FirestoreService from "../../../firebase";
import { getRandomInt } from "../../../helpers";

const Participant = ({
  participant,
  userId,
  user,
  defaultParticipant,
  videoWidth,
  videoHeight,
  isGameVideo = false,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [muted, setMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoRef = useRef();
  const audioRef = useRef();

  if (user) {
    console.log("in the game screen", { user, userId, participant });
  }
  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    if (!defaultParticipant) {
      setVideoTracks(trackpubsToTracks(participant?.videoTracks));
      setAudioTracks(trackpubsToTracks(participant?.audioTracks));

      const trackSubscribed = (track) => {
        if (track.kind === "video") {
          setVideoTracks((videoTracks) => [...videoTracks, track]);
        } else if (track.kind === "audio") {
          setAudioTracks((audioTracks) => [...audioTracks, track]);
        }
      };
      const trackUnsubscribed = (track) => {
        if (track.kind === "video") {
          setVideoTracks((videoTracks) =>
            videoTracks.filter((v) => v !== track)
          );
        } else if (track.kind === "audio") {
          setAudioTracks((audioTracks) =>
            audioTracks.filter((a) => a !== track)
          );
        }
      };

      participant.on("trackSubscribed", trackSubscribed);
      participant.on("trackUnsubscribed", trackUnsubscribed);

      return () => {
        setVideoTracks([]);
        setAudioTracks([]);
        participant.removeAllListeners();
      };
    }
  }, [participant]);

  useEffect(() => {
    if (!defaultParticipant) {
      const videoTrack = videoTracks[0];
      if (videoTrack) {
        videoTrack.attach(videoRef.current);
        return () => {
          videoTrack.detach();
        };
      }
    }
  }, [videoTracks]);

  // useEffect(() => {
  //   if (!defaultParticipant) {
  //     const videoTrack = videoTracks[0];
  //     if (isVideoOn) {
  //       videoTrack?.disable();
  //     } else {
  //       videoTrack?.enable();
  //     }
  //   }
  // }, [isVideoOn]);

  useEffect(() => {
    if (!defaultParticipant) {
      const audioTrack = audioTracks[0];
      if (audioTrack) {
        audioTrack.attach(audioRef.current);
        return () => {
          audioTrack.detach();
        };
      }
    }
  }, [audioTracks]);

  // useEffect(() => {
  //   if (userId) {
  //     FirestoreService.getVideoToggleStatus(userId, "game1").then((player) =>
  //       setIsVideoOn(player?.video)
  //     );
  //   }
  // }, [isVideoOn]);
  // // isVideoOn might work?

  const handleToggleVideo = async () => {
    await FirestoreService.videoToggle(userId, "game1");
    console.log(user.video);
  };

  return (
    <div style={{ position: "relative" }}>
      <>
          <StyledVideoBox displayoff={user?.video} videoHeight={videoHeight} ready={user?.ready} hotseat={user?.hotseat}>
            <StyledVideo ref={videoRef} autoPlay={true} />
          </StyledVideoBox>
          <StyledAvatar
            displayoff={!user?.video}
            src={`https://robohash.org/${participant?.identity}/size=200x${videoHeight}?`}
            sx={{
              height: "100%",
            }}
          />
        </>
      {/* {isGameVideo ? (
        <StyledGameVideoBox displayoff={user?.video} videoHeight={videoHeight}>
          <StyledGameVideo ref={videoRef} autoPlay={true} />
        </StyledGameVideoBox>
      ) : (
        <>
          <StyledVideoBox displayoff={user?.video} videoHeight={videoHeight}>
            <StyledVideo ref={videoRef} autoPlay={true} />
          </StyledVideoBox>
          <StyledAvatar
            displayoff={!user?.video}
            src={`https://robohash.org/${participant?.identity}/size=200x${videoHeight}?`}
            sx={{
              height: "100%",
            }}
          />
        </>
      )} */}
      <>
        {/* {participant?.identity === userId && ( */}
        <Box>
          <StyledAudioIconButton onClick={() => setMuted(!muted)}>
            {muted ? <StyledAudioOffIcon /> : <StyledAudioOnIcon />}
          </StyledAudioIconButton>
          <StyledVideoIconButton onClick={handleToggleVideo}>
            {/* <StyledVideoIconButton onClick={() => setIsVideoOn(!isVideoOn)}> */}
            {user?.video ? <StyledVideoOffIcon /> : <StyledVideoOnIcon />}{" "}
          </StyledVideoIconButton>
        </Box>
        {/* )} */}
        <audio ref={audioRef} muted={muted} />
      </>
    </div>
  );
};

export default Participant;
