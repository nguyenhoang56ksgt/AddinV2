import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Button,
  Menu,
  Form,
  Input,
  Checkbox,
  Modal,
  message,
  Typography,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../../../redux/actions/index';
const { Text } = Typography;

const Header = (props) => {
  const {
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    firebase,
    signIn,
    signOut
  } = props;

  useEffect(() => {
    if (isAuthenticated) {
      message.success('Logged successfully!');
      setVisibleModal(false);
    }
  }, [isAuthenticated, error]);
  const [current, setCurrent] = useState();
  const [visible, setVisibleModal] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const openModal = () => {
    setVisibleModal(true);
  };
  const handleCancelModal = (e) => {
    setVisibleModal(false);
  };
  const onFinish = ({ username, password }) => {
    //login(username, password, firebase);
    signIn({ username, password });
  };

  const logoutUser = () => {
    //logout();
    signOut();
  };
  let errorMessage;
  if (error) {
    errorMessage = <Text type="danger">{error.message}</Text>;
  }

  let contentModal = (
    <Form
      name="normal_login"
      className={classes.login_form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {errorMessage}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className={classes.login_form_forgot}>Forgot password</Link>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={classes.login_form_button}
          loading={loading}
        >
          Log in
        </Button>
        Or <Link>register now!</Link>
      </Form.Item>
    </Form>
  );
  let button = (
    <Button type="primary" onClick={openModal}>
      Login
    </Button>
  );
  if (isAuthenticated) {
    button = <Button onClick={logoutUser}>Logout</Button>;
  }

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="planning">
          <Link to="/planning">Planning</Link>
        </Menu.Item>
        <Menu.Item key="todo">
          <Link to="/todo">Todo</Link>
        </Menu.Item>
        <span className={classes.Button}>{button}</span>
      </Menu>

      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        title="Login"
        visible={visible}
        onCancel={handleCancelModal}
      >
        {contentModal}
      </Modal>
    </>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, firebase) =>
      dispatch(actions.auth(email, password, firebase)),
    logout: () => dispatch(actions.logout()),
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    signOut:() => dispatch(actions.signOut())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
