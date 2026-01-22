import { useQuery } from "@tanstack/react-query";
import { ShuffleIcon } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled, { css } from "styled-components";

import { pulse } from "../styled/animations";
import { IconBtn, squircle, WidgetContainer } from "../styled/shared";
import { getIsFeatureEnabled } from "../utils";
import { fetchRandomTrack, QUERY_KEYS, type RandomTrack } from "../utils/fetch";

const Container = styled(WidgetContainer)<{ $isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  transition: filter 0.3s ease;
  margin-bottom: 1rem;

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
  ${squircle("sm")}
  aspect-ratio: 1/1;
  width: 100px;

  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;

  @media (min-width: 768px) {
    // disabled on mobile due to Safari iOS glitches
    transition: background-image 0.3s ease;
  }

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

const TrackInfo = styled.div<{ $ellipsis?: boolean }>`
  flex: 1;
  min-width: 0;

  & p {
    ${({ $ellipsis }) =>
      $ellipsis &&
      css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `}
  }
`;

const TrackNameWrapper = styled.div<{ $isPlaying?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;

  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      animation: ${pulse} 2s infinite;
    `}
`;

const TrackName = styled.p`
  line-height: 2;
  
  @media (max-width: 480px) {
    line-height: unset;
  }
`;

const ExplicitIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xs);
  font-size: 10px;
  color: var(--background-color);
  background-color: var(--text-color);
  width: 16px;
  height: 16px;
  user-select: none;
  flex-shrink: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
`;

const TrackDetails = styled.p`
  color: var(--text-secondary);
`;

const AudioPreview = styled.audio`
  width: 100%;
`;

const ShuffleBtn = styled(IconBtn)`
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  border: 1px solid var(--border-color);
`;

const MusicWidget = () => {
  const { t } = useTranslation();
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    data: track,
    refetch,
    isFetching,
    error,
  } = useQuery<RandomTrack, Error>({
    queryKey: [QUERY_KEYS.randomTrack],
    enabled: false,
    retry: false,
    queryFn: fetchRandomTrack,
  });

  const triggerRandomTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPreviewPlaying(false);
    }

    void refetch();
  }, [refetch]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPreviewPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPreviewPlaying(!isPreviewPlaying);
    }
  };

  useEffect(() => {
    getIsFeatureEnabled().then((enabled) => {
      setIsFeatureEnabled(enabled);
    });
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch track:", error);
      toast.error(t("contact.errorFetchTrack"));
    }
  }, [error, t]);

  useEffect(() => {
    if (track) {
      window.umami?.track("random-song", {
        track: track.title,
        artist: track.artist,
      });
    }
  }, [track]);

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

  if (!track) {
    return (
      <Container $isLoading={isFetching}>
        <TrackWrapper>
          <TrackInfo>
            <TrackNameWrapper>
              <TrackName>{t("contact.randomSong")}</TrackName>
            </TrackNameWrapper>
          </TrackInfo>
          <ShuffleBtn onClick={triggerRandomTrack} aria-label={t("contact.getRandomSong") || ""}>
            <ShuffleIcon />
          </ShuffleBtn>
        </TrackWrapper>
      </Container>
    );
  }

  return (
    <Container $isLoading={isFetching}>
      <TrackWrapper>
        <CoverThumbnail
          role="img"
          aria-label={track.title}
          $src={track.coverUrl}
          onClick={togglePlayPause}
          key={track.title}
        />
        <TrackInfo $ellipsis>
          <TrackNameWrapper $isPlaying={isPreviewPlaying}>
            <TrackName>{track.title}</TrackName>
            {track.isExplicit && <ExplicitIcon>E</ExplicitIcon>}
          </TrackNameWrapper>
          <TrackDetails>{track.artist}</TrackDetails>
        </TrackInfo>
        <ShuffleBtn onClick={triggerRandomTrack} aria-label={t("contact.getRandomSong") || ""}>
          <ShuffleIcon />
        </ShuffleBtn>
      </TrackWrapper>
      <Player audioPreviewUrl={track.previewUrl} audioRef={audioRef} />
    </Container>
  );
};

const Player = ({
  audioPreviewUrl,
  audioRef,
}: {
  audioPreviewUrl: string | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  if (!audioPreviewUrl) {
    return null;
  }

  return <AudioPreview controls src={audioPreviewUrl} ref={audioRef} />;
};

export default MusicWidget;
