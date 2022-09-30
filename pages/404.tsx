import styled from "styled-components";
import React from "react";
import theme from "../styles/theme";

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  pointer-events: none;
`;
const Text = styled.span`
  font-family: ${theme.fonts.openSans};
  font-weight: 700;
  font-size: 200px;
  color: #EEEEEE;

  @media (max-width: ${theme.media.sm}) {
    font-size: 150px;
  }
  @media (max-width: ${theme.media.xs}) {
    font-size: 120px;
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <Text>
        404
      </Text>
    </Wrapper>
  );
}

export default NotFound;
