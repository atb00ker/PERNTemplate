import axios from 'axios';
import { IResponse } from "../../../interfaces/IResponse";
import { IPern } from '../../../interfaces/IPern';

export const pern1: IPern = { id: "1", name: "Test#1" };
export const pern2: IPern = { id: "2", name: "Test#2" };

export const mockGet_200 = (data: Array<IPern>) => {
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockImplementation((_) => {
    const response: IResponse<Array<IPern>> = { data: data, status: 200 }
    return Promise.resolve(response);
  });
}

export const mockGet_400 = () => {
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockImplementation((_) => {
    const response: IResponse<Array<IPern>> = { data: [], status: 400 }
    return Promise.resolve(response);
  });
}

export const mockPost_201 = (data: IPern) => {
  const mockGet = jest.spyOn(axios, 'post');
  mockGet.mockImplementation((_, __) => {
    const response: IResponse<IPern> = { data: data, status: 200 }
    return Promise.resolve(response);
  });
}
