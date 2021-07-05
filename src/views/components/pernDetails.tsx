import React, { useRef, useState, useEffect } from 'react';
import { getData, putData } from "../../services/data";
import { IPern } from "../interfaces/IPern";
import { IResponse } from "../interfaces/IResponse";

const PernDetails = (props) => {
  const pernUrl = `/pern/${props.match.params.uuid}`;
  let pernName = useRef(null);
  const [pernDetailsInDb, setPernDetails] = useState({} as IPern);
  useEffect(() => getPernDetails(), [props.match.params.uuid]);

  const getPernDetails = () => {
    getData<IResponse<IPern>>(pernUrl).then(result => {
      setPernDetails(result.data);
    });
  };

  const updateName = (_) => {
    const data = { name: pernName.current.value };
    putData<IResponse<IPern>>(pernUrl, data).then(result => {
      console.log(result);
      setPernDetails(result.data);
    });
  };

  return (
    <React.Fragment>
      <div>ID: {pernDetailsInDb?.id}</div>
      <div>Name: <input type="text" name="pern_name" id="pern_name"
        ref={pernName} defaultValue={pernDetailsInDb?.name} /></div>
      <div>Created: {pernDetailsInDb.createdAt}</div>
      <div>Updated: {pernDetailsInDb?.updatedAt}</div>
      <button type="submit" onClick={(event: React.MouseEvent) => (updateName(event))}>Submit</button>
    </React.Fragment >
  );
};

export default PernDetails;
