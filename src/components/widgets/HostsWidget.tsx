import { GithubIcon } from "lucide-react";
import { styled } from "styled-system/jsx";

import type { PortfolioHost } from "../../utils/fetch";

const Tree = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    fontFamily: 'var(--font-mono, "SFMono-Regular", "Menlo", monospace)',
    fontSize: "0.84rem",
    lineHeight: 1.35,
    md: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: "0.9rem 1.4rem",
    },
    mdDown: {
      fontSize: "0.73rem",
    },
  },
});

const HostBlock = styled("div", {
  base: {
    "& + &": {
      marginTop: "0.5rem",
    },
    md: {
      flex: "1 1 15rem",
      minWidth: "15rem",
      maxWidth: "20rem",
      "& + &": {
        marginTop: 0,
      },
    },
  },
});

const Line = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: "0.2rem 0.45rem",
    minWidth: 0,
  },
});

const Target = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.22rem",
    minWidth: 0,
    whiteSpace: "nowrap",
  },
});

const Prefix = styled("span", {
  base: {
    color: "var(--network-tree-color)",
    whiteSpace: "pre",
    userSelect: "none",
  },
});

const DomainLink = styled("a", {
  base: {
    display: "inline",
    padding: 0,
    margin: 0,
    borderRadius: 0,
    color: "var(--text-color)",
    whiteSpace: "nowrap",
    textDecoration: "underline",
    textUnderlineOffset: "0.18em",
    textDecorationThickness: "1px",
    backgroundColor: "transparent",
    _hover: {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
  variants: {
    root: {
      true: {
        fontWeight: 700,
      },
      false: {
        fontWeight: 550,
      },
    },
  },
});

const SourceLink = styled("a", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.05rem",
    margin: 0,
    borderRadius: 0,
    color: "var(--text-secondary)",
    textDecoration: "none",
    backgroundColor: "transparent",
    flexShrink: 0,
    lineHeight: 1,
    transition:
      "transform 0.16s cubic-bezier(0.23, 1, 0.32, 1), color 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
    "& svg": {
      width: "1.18rem",
      height: "1.18rem",
      strokeWidth: 2,
    },
    "@media (hover: hover) and (pointer: fine)": {
      _hover: {
        color: "var(--github-color)",
      },
    },
    _active: {
      transform: "scale(0.96)",
    },
  },
});

const Branches = styled("div", {
  base: {
    marginTop: "0.08rem",
    paddingLeft: "1.45rem",
    display: "grid",
    gap: "0.08rem",
    mdDown: {
      paddingLeft: "1.15rem",
    },
  },
});

const MaybeSource = ({ repoLink }: { repoLink?: string }) =>
  repoLink ? (
    <SourceLink href={repoLink} target="_blank" rel="noreferrer" aria-label="View source on GitHub">
      <GithubIcon />
    </SourceLink>
  ) : null;

const HostsWidget = ({ hosts }: { hosts: PortfolioHost[] }) => (
  <Tree>
    {hosts.map((host) => (
      <HostBlock key={host.name}>
        <Line>
          <Prefix>{">"}</Prefix>
          <Target>
            <DomainLink root href={host.link} target="_blank" rel="noreferrer">
              {host.name}
            </DomainLink>
            <MaybeSource repoLink={host.repoLink} />
          </Target>
        </Line>

        {host.subdomains && host.subdomains.length > 0 ? (
          <Branches>
            {host.subdomains.map((subdomain, index, subs) => (
              <Line key={subdomain.name}>
                <Prefix>{index === subs.length - 1 ? "└─" : "├─"}</Prefix>
                <Target>
                  <DomainLink href={subdomain.link} target="_blank" rel="noreferrer">
                    {subdomain.name}
                  </DomainLink>
                  <MaybeSource repoLink={subdomain.repoLink} />
                </Target>
              </Line>
            ))}
          </Branches>
        ) : null}
      </HostBlock>
    ))}
  </Tree>
);

export default HostsWidget;
