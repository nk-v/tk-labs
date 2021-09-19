export type Data = {
  mtx: math.MathArray;
  row: number;
  col: number;
};

export type Func = (funcRowIndex: number) => void;

export enum RowProceed {
  NEXT = "NEXT",
  PREV = "PREV",
}
