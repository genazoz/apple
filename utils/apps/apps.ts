import {getAbsColProps, getColProps, getSelCellIndexProps, getPageIndexProps} from "./types";

export const getSelCellIndex = ({selPageIndex, selCol, selAbsRow, appsPerPage, colMax}: getSelCellIndexProps) => (selCol - 1) + ((selAbsRow - 1) * colMax) + (selPageIndex * appsPerPage)

export const getCol = ({itemIndex, colMax}: getColProps) => ((itemIndex + 1) % colMax) || colMax

export const getAbsCol = ({pageIndex, data, col, width, colMax}: getAbsColProps) => {
  const stepX = width / colMax
  const selRelCol = Math.round((data.x + (col * stepX)) / stepX)
  return (pageIndex * colMax) + selRelCol
}

export const getPageIndex = ({selAbsCol, colMax}: getPageIndexProps) => Math.ceil(selAbsCol / colMax) - 1