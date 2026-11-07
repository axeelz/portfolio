import { useQuery } from "@tanstack/react-query";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import usePortfolioResponse from "../../hooks/usePortfolioResponse";
import { fetchRandomTrack, QUERY_KEYS, type RandomTrack } from "../../utils/fetch";
import { playButtonClick } from "../../utils/sounds";
import { Block, BlockLabel } from "../ui/shared";

const Song = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "clamp(1.5rem, 3vw, 2.5rem)",
    transition: "opacity 300ms ease",
    "&[data-loading]": { opacity: 0.72 },
  },
});

const Player = styled("div", {
  base: {
    "--size": "clamp(190px, 20vw, 280px)",
    position: "relative",
    flexShrink: 0,
    width: "var(--size)",
    height: "var(--size)",
    marginRight: "calc(var(--size) * 0.32)",
  },
});

const Glow = styled("img", {
  base: {
    position: "absolute",
    inset: "-10%",
    width: "120%",
    height: "120%",
    maxWidth: "none",
    objectFit: "cover",
    filter: "blur(36px)",
    opacity: "var(--glow-opacity)",
    pointerEvents: "none",
  },
});

const Disc = styled("div", {
  base: {
    position: "absolute",
    inset: "3%",
    translate: "12% 0",
    transition: "translate 600ms var(--ease-out)",
    "[data-playing] &": { translate: "36% 0" },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

const Spin = styled("div", {
  base: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "repeating-radial-gradient(circle, #101012 0 1.5px, #1d1d21 1.5px 3px)",
    boxShadow: "var(--surface-shadow), inset 0 0 0 1px rgba(255, 255, 255, 0.14)",
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "spin 3600ms linear infinite",
      animationPlayState: "paused",
      "[data-playing] &": { animationPlayState: "running" },
    },
    "& img": { width: "36%", height: "36%", borderRadius: "50%", objectFit: "cover" },
    _after: {
      content: '""',
      position: "absolute",
      width: "5%",
      height: "5%",
      borderRadius: "50%",
      backgroundColor: "#101012",
    },
  },
});

const Cover = styled("img", {
  base: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "var(--surface-shadow)",
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "coverIn 400ms var(--ease-out)",
    },
  },
});

const EmptyCover = styled("div", {
  base: {
    position: "absolute",
    inset: 0,
    borderRadius: "12px",
    backgroundColor: "var(--soft-color)",
  },
});

const Track = styled("div", {
  base: {
    flex: 1,
    display: "grid",
    justifyItems: "start",
    gap: "0.75rem",
    minWidth: "190px",
  },
});

const Title = styled("h4", {
  base: {
    fontSize: "var(--text-h3)",
    lineHeight: 1.08,
  },
});

const Explicit = styled("span", {
  base: {
    display: "inline-grid",
    placeItems: "center",
    width: "16px",
    height: "16px",
    marginRight: "0.4rem",
    verticalAlign: "0.1em",
    borderRadius: "var(--radius-xs)",
    backgroundColor: "var(--text-color)",
    color: "var(--sheet-color)",
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    letterSpacing: 0,
  },
});

const Artist = styled("span", { base: { color: "var(--text-secondary)" } });

const Bar = styled("div", {
  base: {
    width: "100%",
    height: "3px",
    overflow: "hidden",
    borderRadius: "2px",
    backgroundColor: "var(--border-color)",
  },
});

const BarFill = styled("div", {
  base: {
    height: "100%",
    backgroundColor: "var(--text-color)",
    transform: "scaleX(0)",
    transformOrigin: "0 50%",
    transition: "transform 250ms linear",
  },
});

const Controls = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
  },
});

const ControlButton = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    height: "2.5rem",
    padding: "0 1rem",
    border: "none",
    borderRadius: "var(--radius-full)",
    background: "none",
    boxShadow: "inset 0 0 0 1px var(--border-color)",
    color: "inherit",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.9375rem",
    fontWeight: 500,
    transition: "transform 160ms var(--ease-out)",
    _active: { transform: "scale(0.96)" },
    _disabled: { cursor: "default", opacity: 0.6 },
  },
  variants: {
    solid: {
      true: {
        backgroundColor: "var(--text-color)",
        boxShadow: "none",
        color: "var(--sheet-color)",
      },
    },
  },
});

const ErrorMessage = styled("p", {
  base: { color: "var(--text-secondary)", fontSize: "0.875rem" },
});

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wasPlayingRef = useRef(false);
  const { data: portfolioResponse } = usePortfolioResponse();
  const isFeatureEnabled = portfolioResponse?.features?.musicWidget ?? false;

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

  // The backend decides what plays, so the first track is only requested once the widget is near.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void refetch();
      },
      { rootMargin: "200px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [isFeatureEnabled, refetch]);

  useEffect(() => {
    if (error) console.error("Failed to fetch track:", error);
  }, [error]);

  const play = (audio: HTMLAudioElement) => {
    setPlaybackFailed(false);
    void audio.play().catch((playError: unknown) => {
      // Pausing or switching track while it loads aborts the play request: that is not a failure.
      if (playError instanceof DOMException && playError.name === "AbortError") return;
      setIsPlaying(false);
      setPlaybackFailed(true);
    });
  };

  useEffect(() => {
    if (track && wasPlayingRef.current && audioRef.current) {
      wasPlayingRef.current = false;
      play(audioRef.current);
    }
  }, [track]);

  const anotherSong = async () => {
    void playButtonClick();
    setPlaybackFailed(false);
    wasPlayingRef.current = isPlaying;
    audioRef.current?.pause();

    const { data, isSuccess } = await refetch();
    if (isSuccess) {
      void window.umami?.track("random-song", { track: data.title, artist: data.artist });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play(audio);
    else audio.pause();
  };

  if (!isFeatureEnabled) {
    return null;
  }

  return (
    <Block ref={rootRef}>
      <BlockLabel>{copy.garden.song}</BlockLabel>
      <Song data-loading={isFetching || undefined}>
        <Player data-playing={isPlaying || undefined}>
          {track && <Glow src={track.coverUrl} alt="" />}
          <Disc>
            <Spin>{track && <img src={track.coverUrl} alt="" />}</Spin>
          </Disc>
          {track ? <Cover key={track.uri} src={track.coverUrl} alt="" /> : <EmptyCover />}
        </Player>

        <Track>
          <div>
            <Title>{track?.title ?? " "}</Title>
            <Artist>
              {track?.isExplicit && <Explicit aria-label="Explicit">E</Explicit>}
              {track?.artist ?? " "}
            </Artist>
          </div>
          <Bar>
            <BarFill key={track?.uri} ref={barRef} />
          </Bar>
          <Controls>
            {track?.previewUrl && (
              <ControlButton solid onClick={togglePlay}>
                {isPlaying ? (
                  <PauseIcon size={14} fill="currentColor" aria-hidden />
                ) : (
                  <PlayIcon size={14} fill="currentColor" aria-hidden />
                )}
                {isPlaying ? copy.garden.pause : copy.garden.play}
              </ControlButton>
            )}
            <ControlButton onClick={() => void anotherSong()} disabled={isFetching}>
              {copy.garden.anotherSong}
            </ControlButton>
          </Controls>
          {(error || playbackFailed) && (
            <ErrorMessage role="status">
              {error ? copy.garden.songError : copy.garden.playError}
            </ErrorMessage>
          )}
        </Track>
      </Song>

      {track?.previewUrl && (
        <audio
          ref={audioRef}
          src={track.previewUrl}
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={({ currentTarget: { currentTime, duration } }) => {
            if (barRef.current && duration) {
              barRef.current.style.transform = `scaleX(${currentTime / duration})`;
            }
          }}
        />
      )}
    </Block>
  );
};

export default MusicWidget;
