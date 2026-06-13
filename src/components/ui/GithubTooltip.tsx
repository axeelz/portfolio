import { styled } from "styled-system/jsx";

import { GITHUB_USERNAME, type GithubUser } from "../../utils/fetch";

const Container = styled("div", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    "& img": {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
    },
  },
});

export const GithubTooltip = ({ user }: { user: GithubUser | null }) => {
  return (
    <Container>
      {user ? (
        <>
          <img src={user.avatar_url} alt="Avatar" />
          <div>
            <strong>{user.name}</strong>
          </div>
        </>
      ) : (
        <span>{GITHUB_USERNAME}</span>
      )}
    </Container>
  );
};
