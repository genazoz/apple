import React, {FC} from 'react'
import styled from "styled-components";

import {useAppSelector} from "../../../app/hooks";
import {appsSelector} from "../../../features/apps/appsSlice";

interface PaginationStyleProps {
  device: string;
  orientation: string;
}

const PaginationDOM = styled.div<PaginationStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: auto 0 12px 0;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
                gap: 8px;
                margin: auto 0 5px 0;
                
                button {
                  width: 5px;  
                  height: 5px;
                }
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`
const Button = styled.button<{isActive: boolean}>`
  position: relative;
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7px;  
  height: 7px;

  outline: none;
  border: 0;
  background-color: transparent;
  
  &:last-child {
    display: none;
  }

  ${props => props.isActive && `
    span {
      opacity: .75;
    }
  `}
`
const Dot = styled.span`
  width: 100%;
  height: 100%;
  
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.5;
`

interface PaginationProps {
  curDesktopIndex: number,
  pagesCount: number,
  setPage: (pageIndex: number) => void,
}

const Pagination: FC<PaginationProps> = ({curDesktopIndex, pagesCount, setPage}) => {
  const {device, orientation} = useAppSelector(appsSelector)

  const handleClick = (pageIndex: number) => {
    setPage(pageIndex);
  }

  return (
    <PaginationDOM device={device} orientation={orientation}>
      {
        [...Array(Math.ceil(pagesCount))].map((desktopItem, pageIndex) => {
          return (
            <Button
              key={pageIndex}
              isActive={curDesktopIndex === pageIndex}
              onClick={() => handleClick(pageIndex)}
            >
              <Dot/>
            </Button>
          )
        })
      }
    </PaginationDOM>
  )
}

export default Pagination;