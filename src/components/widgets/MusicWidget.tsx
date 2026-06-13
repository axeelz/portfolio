import { useQuery } from "@tanstack/react-query";
import { ShuffleIcon } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { toast } from "sonner";
import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import usePortfolioResponse from "../../hooks/usePortfolioResponse";
import { fetchRandomTrack, QUERY_KEYS, type RandomTrack } from "../../utils/fetch";
import { IconBtn, ImageGlowFrame, WidgetContainer } from "../ui/shared";

const Container = styled(WidgetContainer, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    transition: "opacity 0.3s ease",
  },
  variants: {
    loading: {
      true: {
        opacity: 0.72,
        pointerEvents: "none",
      },
    },
  },
});

const TrackWrapper = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    isolation: "isolate",
    position: "relative",
    zIndex: 1,
  },
});

const CoverThumbnail = styled("div", {
  base: {
    borderRadius: "var(--radius-sm)",
    "@supports (corner-shape: squircle)": {
      cornerShape: "squircle",
      borderRadius: "var(--squircle-md)",
    },
    aspectRatio: "1/1",
    width: "100px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    mdDown: { width: "75px" },
    smDown: { width: "50px" },
  },
});

const TrackInfo = styled("div", {
  base: {
    flex: 1,
    minWidth: 0,
  },
  variants: {
    ellipsis: {
      true: {
        "& p": {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      },
    },
  },
});

const TrackNameWrapper = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontWeight: "bold",
  },
});

const TrackName = styled("p", {
  base: {
    lineHeight: 2,
    smDown: { lineHeight: "unset" },
  },
});

const ExplicitIcon = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-xs)",
    fontSize: "10px",
    color: "var(--background-color)",
    backgroundColor: "var(--text-color)",
    width: "16px",
    height: "16px",
    userSelect: "none",
    flexShrink: 0,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
});

const TrackDetails = styled("p", {
  base: {
    color: "var(--text-secondary)",
  },
});

const AudioPreview = styled("audio", {
  base: {
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
});

const ShuffleBtn = styled(IconBtn, {
  base: {
    backgroundColor: "var(--button-background-color)",
    color: "var(--button-text-color)",
    border: "1px solid var(--border-color)",
  },
});

const AMBIENT_STYLE = {
  filter: "blur(64px) saturate(1.15)",
  inset: "-22%",
  transform: "scale(1.32)",
} as const;

const AmbientGlow = ({ src }: { src: string }) => {
  const slots = useRef<[string | null, string | null]>([null, null]);
  const active = useRef<0 | 1>(0);
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const next: 0 | 1 = active.current === 0 ? 1 : 0;
    active.current = next;
    slots.current[next] = src;
    rerender();
  }, [src]);

  return (
    <>
      {([0, 1] as const).map((i) => (
        <ImageGlowFrame
          key={i}
          aria-hidden="true"
          style={{
            backgroundImage: slots.current[i] ? `url(${slots.current[i]})` : "none",
            opacity: active.current === i && slots.current[i] ? 0.28 : 0,
            ...AMBIENT_STYLE,
          }}
        />
      ))}
    </>
  );
};

const MusicWidget = () => {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

  const triggerRandomTrack = () => {
    wasPlayingRef.current = isPreviewPlaying;

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPreviewPlaying(false);
    }

    void refetch();
  };

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch track:", error);
      toast.error(copy.contact.errorFetchTrack);
    }
  }, [error]);

  useEffect(() => {
    if (track) {
      void window.umami?.track("random-song", {
        track: track.title,
        artist: track.artist,
      });
    }
  }, [track]);

  useEffect(() => {
    if (track && wasPlayingRef.current && audioRef.current) {
      void audioRef.current.play();
      wasPlayingRef.current = false;
    }
  }, [track]);

  if (!isFeatureEnabled) {
    return null;
  }

  if (!track) {
    return (
      <Container loading={isFetching}>
        <TrackWrapper>
          <TrackInfo>
            <TrackNameWrapper>
              <TrackName>{copy.contact.randomSong}</TrackName>
            </TrackNameWrapper>
          </TrackInfo>
          <ShuffleBtn onClick={triggerRandomTrack} aria-label={copy.contact.getRandomSong}>
            <ShuffleIcon />
          </ShuffleBtn>
        </TrackWrapper>
      </Container>
    );
  }

  return (
    <Container loading={isFetching}>
      <AmbientGlow src={track.coverUrl} />
      <TrackWrapper>
        <CoverThumbnail
          role="img"
          aria-label={track.title}
          style={{ backgroundImage: `url(${track.coverUrl})` }}
        />
        <TrackInfo ellipsis>
          <TrackNameWrapper>
            <TrackName>{track.title}</TrackName>
            {track.isExplicit && <ExplicitIcon>E</ExplicitIcon>}
          </TrackNameWrapper>
          <TrackDetails>{track.artist}</TrackDetails>
        </TrackInfo>
        <ShuffleBtn onClick={triggerRandomTrack} aria-label={copy.contact.getRandomSong}>
          <ShuffleIcon />
        </ShuffleBtn>
      </TrackWrapper>
      {track.previewUrl && (
        <AudioPreview
          controls
          src={track.previewUrl}
          ref={audioRef}
          onPlay={() => setIsPreviewPlaying(true)}
          onPause={() => setIsPreviewPlaying(false)}
          onEnded={() => setIsPreviewPlaying(false)}
        />
      )}
    </Container>
  );
};

export default MusicWidget;
