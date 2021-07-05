export interface IResponse<T> {
  data: T;
  status: number;
  request?: any;
}