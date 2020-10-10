import React from "react";
import LoginForm from "./components/Login";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import "antd/dist/antd.css";
import "./index.css";
import { Layout } from "antd";
import MsgContextProvider from "./contexts/MsgContext";
// const bg = require ("../public/bg.jpg")
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <Nav />
          <Layout
            className="site-layout"
            style={{
              backgroundImage: `url(https://previews.agefotostock.com/previewimage/medibigoff/da649bd9e7486ee1b1a9c7a41d0cbf86/esy-040600100.jpg)`,
              // backgroundImage: `url(https://proudhappymama.com/wp-content/uploads/2020/04/DIY-Mothers-Day-Card-Ideas.jpg)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <MsgContextProvider>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={LoginForm} />
                  <Route exact path="/signup" component={Signup} />
                  {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
                  <Route exact path="/logout" component={Logout} />
                  <Route component={NotFound} />
                </Switch>
              </MsgContextProvider>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
