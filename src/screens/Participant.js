import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "rebass";
import styled from "@emotion/styled";
import {
  StyledAvatar,
  StyledAudioOnIcon,
  StyledAudioOffIcon,
  StyledVideoOnIcon,
  StyledVideoOffIcon,
  StyledVideoIconButton,
} from "./Lobby/LobbyStyles";
import { getRandomInt } from "../helpers";

const StyledVideoBox = styled(Box)`
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
  display: ${(props) => {
    if (props.nodisplay) return "none";
    return "block";
  }};
`;
const StyledVideo = styled.video`
  /* width: 500px;
  height: 500px;
  position: absolute;
  top: -125px;
  left: -125px; */
  object-fit: fill;

  width: 300px;
  display: ${(props) => {
    if (props.nodisplay) return "none";
    return "block";
  }};
`;
const StyledBox = styled.video`
  position: relative;
  top: 0;
  display: flex;
`;

const Participant = ({ participant, userId }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [muted, setMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  console.log(participant?.identity, userId);
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
    if (videoTrack) {
      isVideoOn ? videoTrack.disable() : videoTrack.enable();
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
      <p>{participant?.username}</p>
      <StyledVideoBox nodisplay={isVideoOn}>
        <StyledVideo nodisplay={isVideoOn} ref={videoRef} autoPlay={true} />
      </StyledVideoBox>
      {isVideoOn && (
        <StyledAvatar
          src={`https://robohash.org/${participant?.identity}/size=200x300?`}
          sx={{
            width: 300,
            height: 196,
          }}
        />
      )}
      {participant?.identity === userId && (
        <Box>
          <StyledVideoIconButton onClick={() => setMuted(!muted)}>
            {muted ? <StyledAudioOffIcon /> : <StyledAudioOnIcon />}
          </StyledVideoIconButton>
          <StyledVideoIconButton onClick={() => setIsVideoOn(!isVideoOn)}>
            {isVideoOn ? <StyledVideoOffIcon /> : <StyledVideoOnIcon />}{" "}
          </StyledVideoIconButton>
        </Box>
      )}
      <audio ref={audioRef} autoPlay={true} muted={muted} />
    </>
  );
};

export default Participant;
