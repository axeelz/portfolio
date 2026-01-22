import styled from "styled-components";

import { GITHUB_USERNAME } from "../utils";
import { type GithubUser } from "../utils/fetch";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  & img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const GithubTooltip = ({ user }: { user: GithubUser | null }) => {
  return (
    <Container>
      {(user && (
        <>
          <img src={user.avatar_url} alt="Avatar" />
          <div>
            <strong>{user.name}</strong>
          </div>
        </>
      )) || <span>{GITHUB_USERNAME}</span>}
    </Container>
  );
};
