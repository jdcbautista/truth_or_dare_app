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
} from "../LobbyStyles";
import { getRandomInt } from "../../../helpers";

const Participant = ({
  participant,
  userId,
  defaultParticipant,
  videoWidth,
  videoHeight,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [muted, setMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
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
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (isVideoOn) {
      videoTrack?.disable();
    } else {
      videoTrack?.enable();
    }
  }, [isVideoOn]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <>
      <StyledVideoBox displayoff={isVideoOn} videoHeight={videoHeight}>
        <StyledVideo ref={videoRef} autoPlay={true} />
      </StyledVideoBox>

      <StyledAvatar
        displayoff={!isVideoOn}
        src={`https://robohash.org/${participant?.identity}/size=200x${videoHeight}?`}
        sx={{
          height: videoHeight,
        }}
      />

      {participant?.identity === userId && (
        <Box>
          <StyledAudioIconButton onClick={() => setMuted(!muted)}>
            {muted ? <StyledAudioOffIcon /> : <StyledAudioOnIcon />}
          </StyledAudioIconButton>
          <StyledVideoIconButton onClick={() => setIsVideoOn(!isVideoOn)}>
            {isVideoOn ? <StyledVideoOffIcon /> : <StyledVideoOnIcon />}{" "}
          </StyledVideoIconButton>
        </Box>
      )}
      <audio ref={audioRef} muted={muted} />
    </>
  );
};

export default Participant;
