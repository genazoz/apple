import React, {FC} from 'react'
import Image from "next/future/image";

import styled from "styled-components";

const ModalAppDOM = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  background-color: rgba(0, 0, 0, 0.8);
`
const Title = styled.span`
  font-weight: bold;
  color: #FFFFFF;
`
const Img = styled.div`
  display: flex;
  max-width: 30%;
  max-height: 30%;
  width: auto;
  height: auto;
`

interface ModalAppProps {
  item: string;
  onStopApp: () => void;
}

const ModalApp: FC<ModalAppProps> = ({item, onStopApp}) => {
  const iconImg = require(`../../../public/img/icons/${item}`)
  const title = item.slice(0, -4)

  return (
    <ModalAppDOM onClick={onStopApp}>
      <Img as={Image} src={iconImg} alt={item} />
      <Title>
        {title}
      </Title>
    </ModalAppDOM>
  )
}

export default ModalApp;