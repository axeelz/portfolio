import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { IconBtn, WidgetContainer } from "../styled/shared";
import { IoShuffle } from "react-icons/io5";
import { BsExplicitFill } from "react-icons/bs";
import { getIsFeatureEnabled } from "../utils";
import { pulse } from "../styled/animations";

const Container = styled(WidgetContainer)<{ $isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  transition: filter 0.3s ease;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      filter: blur(5px);
      pointer-events: none;
    `}
`;

const TrackWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  isolation: isolate;
`;

const CoverThumbnail = styled.div<{ $src: string }>`
  border-radius: calc(var(--card-border-radius) - 1rem);
  aspect-ratio: 1/1;
  width: 100px;

  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background-image 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 75px;
  }

  @media (max-width: 480px) {
    width: 50px;
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background: inherit;
    will-change: filter, transform;
    filter: blur(20px) saturate(1.5);
    transform: scale(1.03);
    z-index: -1;
  }
`;

const TrackInfo = styled.div<{ $ellipsis?: boolean; $isPlaying?: boolean }>`
  flex: 1;
  min-width: 0;

  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      animation: ${pulse} 2s infinite;
    `}

  & > * {
    ${({ $ellipsis }) =>
      $ellipsis &&
      css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `}
  }
`;

const TrackName = styled.p`
  font-weight: bold;
  line-height: 2;

  @media (max-width: 480px) {
    line-height: unset;
  }
`;

const InlineIcon = styled.span`
  font-size: 0.8rem;
  margin-left: 0.25rem;
  vertical-align: middle;
`;

const TrackDetails = styled.p`
  color: var(--text-secondary);
`;

const AudioPreview = styled.audio`
  width: 100%;
`;

const ShuffleBtn = styled(IconBtn)`
  background-color: var(--section-background-color);
  border: 1px solid var(--border-color);
`;

interface Track {
  uri: string;
  name: string;
  album: string;
  artists: string;
  isExplicit: boolean;
  coverUrl: string;
  isPlayable: boolean;
  audioPreviewUrl: string;
}

interface MusicResponse {
  track: Track;
}

const MusicWidget = () => {
  const { t } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchRandomTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPreviewPlaying(false);
    }
    setIsLoading(true);
    fetch("https://music.axlz.me/")
      .then((response) => response.json())
      .then((data: MusicResponse) => {
        setIsInitialized(true);
        setTrack(data.track);
        window.umami.track("random-song", { title: data.track.name, artists: data.track.artists });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [audioRef]);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPreviewPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPreviewPlaying(!isPreviewPlaying);
    }
  }, [isPreviewPlaying, audioRef]);

  useEffect(() => {
    getIsFeatureEnabled().then((enabled) => {
      setIsFeatureEnabled(enabled);
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePause = () => setIsPreviewPlaying(false);
      const handlePlay = () => setIsPreviewPlaying(true);
      const handleEnded = () => setIsPreviewPlaying(false);

      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef, track]);

  if (!isFeatureEnabled) {
    return null;
  }

  if (!isInitialized || !track) {
    return (
      <Container $isLoading={isLoading}>
        <TrackWrapper>
          <TrackInfo>
            <TrackName>{t("contact.randomSong")}</TrackName>
          </TrackInfo>
          <ShuffleBtn onClick={fetchRandomTrack}>
            <IoShuffle />
          </ShuffleBtn>
        </TrackWrapper>
      </Container>
    );
  }

  return (
    <Container $isLoading={isLoading}>
      <TrackWrapper>
        <CoverThumbnail role="img" aria-label={track.name} $src={track.coverUrl} onClick={togglePlayPause} />
        <TrackInfo $ellipsis $isPlaying={isPreviewPlaying}>
          <TrackName>
            {track.name}{" "}
            {track.isExplicit && (
              <InlineIcon>
                <BsExplicitFill />
              </InlineIcon>
            )}
          </TrackName>
          <TrackDetails>{track.artists}</TrackDetails>
        </TrackInfo>
        <ShuffleBtn onClick={fetchRandomTrack}>
          <IoShuffle />
        </ShuffleBtn>
      </TrackWrapper>
      <Player audioPreviewUrl={track.audioPreviewUrl} isPlayable={track.isPlayable} audioRef={audioRef} />
    </Container>
  );
};

const Player = ({
  audioPreviewUrl,
  isPlayable,
  audioRef,
}: {
  audioPreviewUrl: string;
  isPlayable: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  if (!isPlayable) {
    return null;
  }

  return <AudioPreview controls src={audioPreviewUrl} ref={audioRef} />;
};

export default MusicWidget;
