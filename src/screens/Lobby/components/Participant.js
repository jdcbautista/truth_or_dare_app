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
  gamePhase,
  defaultParticipant,
  videoHeight,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef();
  const audioRef = useRef();

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

  const handleToggleVideo = async () => {
    await FirestoreService.videoToggle(
      userId,
      FirestoreService.GAMEROOM,
      user.video
    ).catch(err => console.log(err));
  };

  return (
    <div style={{ position: "relative" }}>
      <>
        <StyledVideoBox
          displayoff={user?.video}
          gamePhase={gamePhase?.phase}
          videoHeight={videoHeight}
          ready={user?.ready}
          hotseat={user?.hotseat}
          winner={user?.winner}
          vote={user?.vote}
        >
          <StyledVideo
            hotseat={user?.hotseat}
            gamePhase={gamePhase?.phase}
            vote={user?.vote}
            username={user?.username}
            ready={user?.ready}
            ref={videoRef}
            autoPlay={true}
          />
        </StyledVideoBox>
        <StyledAvatar
          ready={user?.ready}
          hotseat={user?.hotseat}
          gamePhase={gamePhase?.phase}
          displayoff={!user?.video}
          src={`https://robohash.org/${participant?.identity}/size=200x${videoHeight}?`}
        />

        {participant?.identity === userId && (
          <Box>
            <StyledAudioIconButton onClick={() => setMuted(!muted)}>
              {muted ? <StyledAudioOffIcon /> : <StyledAudioOnIcon />}
            </StyledAudioIconButton>
            <StyledVideoIconButton onClick={handleToggleVideo}>
              {user?.video ? <StyledVideoOffIcon /> : <StyledVideoOnIcon />}{" "}
            </StyledVideoIconButton>
          </Box>
        )}
        <audio ref={audioRef} muted={muted} />
      </>
    </div>
  );
};

export default Participant;
