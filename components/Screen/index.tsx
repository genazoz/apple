import React, {FC} from 'react'
import styled from "styled-components";
import Image from "next/future/image";

import bgImg from '../../public/img/background.jpg'
import Workspace from "../workspace/Workspace";

const ScreenEl = styled.div`
  position: relative;
  
  width: 100%;
  height: 100%;
`
const Background = styled.img`
  position: absolute;
  z-index: 0;
    
  width: 100%;
  height: 100%;
  margin: auto;

  object-fit: cover;
`
const WorkspaceWrapper = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
`

const Screen: FC = () => {
  return (
    <ScreenEl>
      <Background as={Image} src={bgImg}/>
      <WorkspaceWrapper>
        <Workspace />
      </WorkspaceWrapper>
    </ScreenEl>
  )
}

export default Screen;
