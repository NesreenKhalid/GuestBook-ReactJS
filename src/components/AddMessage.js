import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Input, Select, Drawer } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

const AddMessage = ({ msgs, setMsgs }) => {
  // const { msgs, setMsgs } = useContext(MsgContext);
  const { user, token } = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    var newMsg = {
      author: user,
      body: value,
      email: localStorage.getItem("email"),
      // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    };
    setSubmitting(true);
    axios
      .post(`http://localhost:3005/message/new`, newMsg, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setSubmitting(false);
        setMsgs([...msgs, res.data]);
        setValue("");
        console.log("msgs", msgs);
        setVisible(false);
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {token ? (
        <Button
          style={{ margin: 15 }}
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          <PlusOutlined /> Write Message
        </Button>
      ) : (
        <Link to={"/login"}>LOG IN to send message</Link>
      )}

      <Drawer
        height={320}
        title="write new message"
        placement={"top"}
        width={350}
        // mask={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button
              onClick={() => {
                setVisible(false);
              }}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="primary"
            >
              Send
            </Button>
          </div>
        }
      >
        <Form.Item style={{ textAlign: "center" }}>
          <TextArea
           
            rows={6}
            style={{ width: 500 }}
            onChange={handleChange}
            value={value}
          />
        </Form.Item>
      </Drawer>
    </>
  );
};

export default AddMessage;
