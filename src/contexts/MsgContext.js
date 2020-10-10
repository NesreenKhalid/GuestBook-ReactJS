import React, { createContext } from "react";
// import axios from "axios";

export const MsgContext = createContext();

const MsgContextProvider = (props) => {
  // const [msgs, setMsgs] = useState([]);
  
  return (
    <MsgContext.Provider value={{ }}>
      {props.children}
    </MsgContext.Provider>
  );
};

export default MsgContextProvider;
