import React, { useContext, useState, useEffect } from "react";
import { Spin, Space, List } from "antd";
import Message from "./Message";
import AddMessage from "./AddMessage";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const MessageList = ({ msgs, handleDelete, updateAllMsgs }) => (
  <List
    grid={{ gutter: 4, column: 2 }}
    size="large"
    dataSource={msgs}
    renderItem={(msg) => (
      <List.Item>
        <Message
          msg={msg}
          handleDelete={handleDelete}
          updateAllMsgs={updateAllMsgs}
        />
      </List.Item>
    )}
  />
);

const Home = () => {
  const [msgs, setMsgs] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isMsgDeleted, setIsMsgDeleted] = useState(false);

  useEffect(() => {
    const getMsg = async () => {
      await axios
        .get("http://localhost:3005/message/all")
        .then((res) => {
          setMsgs(res.data);
          setLoading(false);
          if (isMsgDeleted) {
            setIsMsgDeleted(false);
          }
          console.log(" Home is loaded");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getMsg();
  }, [isMsgDeleted]);

  const handleDelete = (msgID) => {
    console.log('msgID', msgID, msgs)
    axios
      .delete(`http://localhost:3005/message/${msgID}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log("res", res);
        const tempMessages = msgs.filter(
          (item) =>{
           console.log('item', item)
            return item._id !== msgID
          } 
        )
        console.log('tempMessages', tempMessages)
        setMsgs(tempMessages);
        
        // setIsMsgDeleted(true);
      });
  };

  const updateAllMsgs = (updatedMsg) => {
    const msgWithoutEdited = msgs.filter((msg) => msg._id !== updatedMsg._id);
    setMsgs([...msgWithoutEdited, updatedMsg]);
    console.log("msgs", msgs);
  };
  return (
    <div>
      
        <AddMessage msgs={msgs} setMsgs={setMsgs} />
        <br/>
        <Space direction="vertical" size="large">
        {loading ? (
          <Spin size="large" />
        ) : msgs.length === 0 ? (
          <p> No Messages Yet</p>
        ) : (
          // msgs.map((msg, index) => (
          //   <Message
          //     key={index}
          //     msg={msg}
          //     handleDelete={handleDelete}
          //     updateAllMsgs={updateAllMsgs}
          //   />
          // ))
          <MessageList
            msgs={msgs}
            handleDelete={handleDelete}
            updateAllMsgs={updateAllMsgs}
          />
        )}
      </Space>
    </div>
  );
};

export default Home;
