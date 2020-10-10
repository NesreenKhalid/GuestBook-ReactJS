import React, { useState, useContext } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Comment, Avatar, Form, Button, List, Input, Collapse } from "antd";
import {PlusCircleFilled } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
const { TextArea } = Input;
const { Panel } = Collapse;


const ReplyList = ({ comments }) => (
  <Collapse bordered={false} >
    <Panel
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    >
      <List
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment author={item.email} content={item.body} />
          </li>
        )}
        itemLayout="horizontal"
      />
    </Panel>
  </Collapse>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        // shape="circle"
        icon={<PlusCircleFilled />}
      >
        reply
      </Button>
    </Form.Item>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
  </>
);

const Replies = ({ currentReplies, msgId }) => {
  const { token, user } = useContext(AuthContext);

  const [replies, setReplies] = useState(currentReplies);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false)

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    const newReply = {
      email: localStorage.getItem("email"),
      body: value,
      author: user,
    };
    setSubmitting(true);
    axios
      .put(`http://localhost:3005/message/${msgId}/reply`, newReply, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log("res", res);
      });
    setTimeout(() => {
      setSubmitting(false);
      setReplies([...replies, newReply]);
      setValue("");
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {replies.length > 0 && <ReplyList comments={replies} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          token ? (
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          ) : (
            <Link to={"/login"}>LOG IN to reply</Link>
          )
        }
      />
    </>
  );
};

export default Replies;
