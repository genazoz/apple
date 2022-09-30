export interface getAbsColProps {
  pageIndex: number,
  data: any,
  col: number,
  width: number,
  colMax: number,
}

export interface getPageIndexProps {
  selAbsCol: number,
  colMax: number,
}

export interface getColProps {
  itemIndex: number,
  colMax: number,
}

export interface getSelCellIndexProps {
  selPageIndex: number,
  selCol: number,
  selAbsRow: number,
  appsPerPage: number,
  colMax: number
}