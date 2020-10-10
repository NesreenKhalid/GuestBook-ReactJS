import React, { useContext, useState } from "react";
import { Card, Comment, Tooltip, Avatar, Button, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Replies from "./Replies";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
const { TextArea } = Input;

const Message = ({ msg, handleDelete, updateAllMsgs }) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(msg.body);
  const { token , user} = useContext(AuthContext);

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log("value", value);
  };
  const handleEdit = () => {
    // setValue(msg.body);
    console.log("value", value);
    axios
      .put(
        `http://localhost:3005/message/${msg._id}`,
        { body: value },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        updateAllMsgs(res.data);
        setEditable(false);
      });
  };

  return (
    <Card style={{ width: 400 }}>
      <Comment
        author={<a> {msg.email} </a>}
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        content={
          <>
            {editable ? (
              <>
                {" "}
                <TextArea rows={4} value={value} onChange={handleChange} />{" "}
                <br />{" "}
                <Button type="primary" onClick={() => handleEdit()}>
                  submit
                </Button>{" "}
              </>
            ) : (
              <p> {value} </p>
            )}
            <br />
            {(token && msg.author === user) ?  (
              <>
                <Tooltip title="delete">
                  <Button
                    onClick={() => handleDelete(msg._id)}
                    danger
                    shape="circle"
                    icon={<DeleteFilled />}
                  ></Button>
                </Tooltip>
                <Tooltip title="edit">
                  {" "}
                  <Button
                    //  disabled={token ? false : true}
                    onClick={() => {
                      setEditable(true);
                    }}
                    shape="circle"
                    icon={<EditFilled />}
                  ></Button>
                </Tooltip>{" "}
              </>
            ) : (
              <br />
            )}
          </>
        }
      />
      <Replies currentReplies={msg.replies} msgId={msg._id} />
    </Card>
  );
};

export default Message;
