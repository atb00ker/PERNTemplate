/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Pern from '../components/Pern/Pern';
import { render, cleanup, act, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { mockGet_200, mockPost_201 } from './mock/HttpRequestMock';
import { pern1, pern2 } from '../../__tests__/mock/PernData';
import * as dotenv from "dotenv";

dotenv.config();
describe('Pern Component', () => {
  beforeEach(() => { mockGet_200([pern1]) });
  afterEach(() => { cleanup });

  it("renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Router><Pern></Pern></Router>, root);
  });

  it("test submit buttom exists and has correct props", async () => {
    let page;
    await act(async () => { page = await render(<Router><Pern></Pern></Router>) });
    const submitBtn = page.getByTestId("pern-submit-btn");
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
    // expect(submitBtn.getAttribute('style')).toEqual('margin: 10px');
    expect(submitBtn).toHaveStyle('margin: 10px');
    expect(submitBtn).toHaveProperty('id', 'submit_btn');
    expect(submitBtn).toHaveTextContent("Submit");
  });

  it("test submit form and page update", async () => {
    let page;
    mockPost_201(pern2);
    await act(async () => { page = await render(<Router><Pern></Pern></Router>) });
    await waitFor(() => expect(page.getByText('Test#1')).toBeInTheDocument());
    expect(page.getByTestId("pern-list")).not.toHaveTextContent('Test#2');

    await act(async () => {
      const submitBtn = page.getByTestId("pern-submit-btn");
      submitBtn.click();
    });
    await waitFor(() => expect(page.getByText('Test#1')).toBeInTheDocument());
    await waitFor(() => expect(page.getByText('Test#2')).toBeInTheDocument());
  });

  it("snapshot match form", () => {
    const snapTree = renderer.create(<Pern></Pern>);
    expect(snapTree.toJSON()[0]).toMatchSnapshot();
  });
});
