import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
 
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
  const { loading, error, auth, signIn, signOut } = props;

  useEffect(() => {
    if (auth.uid) {
      message.success('Logged successfully!');
      setVisibleModal(false);
    }
  }, [auth, error]);
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
  if (auth.uid) {
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
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired, 
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    signOut: () => dispatch(actions.signOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
