import React, { useRef, useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { postData, getData, deleteData } from "../../services/data";
import { IPern } from "../../interfaces/IPern";
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';
import { IResponse } from "../../interfaces/IResponse";
import { Link } from "react-router-dom";
import './Pern.css';

const Pern = () => {
  const pernUrl = "/pern/",
    pernName = useRef(null),
    isInitialMount = useRef(true);
  const [pernInDb, setPernInDb] = useState(Array<IPern>());
  useEffect(() => getPernInDb(), [pernName]);

  const protocol = location.protocol === 'http:' ? 'ws:' : 'wss:';
  const port = location.protocol === 'http:' ? process.env.APP_PORT : '443';
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${protocol}//${location.hostname}:${port}`);
  const [messageCollection, setMessageCollection] = useState(Array<string>());

  useEffect(() => {
    // Just send connected message to express server.
    if (!isInitialMount.current) {
      setMessageCollection(messageCollection.concat(lastMessage.data));
      sendMessage('Connected');
    } else
      isInitialMount.current = false;
  }, [lastMessage]);

  const onPernCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name: pernName.current.value };
    postData<IResponse<IPern>>(pernUrl, data).then(response => {
      setPernInDb(pernInDb.concat(response.data));
    });
  }

  const getPernInDb = () => {
    getData<IResponse<Array<IPern>>>(pernUrl).then(response => setPernInDb(response.data));
  }

  const deletePern = (uuid: string) => {
    deleteData(`/pern/${uuid}`).then(_ => {
      const updatedPern = pernInDb.filter(record => record.id !== uuid);
      setPernInDb(updatedPern);
    });
  }

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <form onSubmit={(event: React.FormEvent) => onPernCreateSubmit(event)} method="post">
          <input type="text" name="pern_name" id="pern_name" ref={pernName} />
          <button data-testid="pern-submit-btn" id="submit_btn" style={{ margin: '10px' }} type="submit">Submit</button>
        </form>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ul data-testid="pern-list">
          {pernInDb.map(row => (
            <li key={row.id} id={row.id}>
              <span>{row.name}</span>
              <Link style={{ margin: '10px' }} to={`${pernUrl}${row.id}`}>Edit</Link>
              <a href="#" onClick={(event: React.MouseEvent) => { deletePern(`${row.id}`) }}>Delete</a>
            </li>
          ))}
        </ul>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {lastMessage?.data && <div>Last Updated: {lastMessage?.data}</div>}
        {lastMessage?.data && messageCollection && <div>Update List: {messageCollection.join(', ')}</div>}
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default Pern;
