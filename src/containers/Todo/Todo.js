import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Form, Table, Space, Tabs, Tag, Popconfirm } from 'antd';
import Moment from 'react-moment';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classes from './Todo.module.css';
import * as actions from '../../redux/actions';
import taskTags from '../../constants/taskTags';

const { TabPane } = Tabs;
const { CheckableTag } = Tag;


function cancel(e) {
  console.log(e);
}
const Todo = ({ loading, onAddTask, tasks, onGetTask, onDeleteTask }) => {
  useEffect(() => {
    onGetTask();
  }, [onGetTask]);

  const [selectedTags, setSelectedTags] = useState([taskTags[0]]);

  const deleteTask =(taskId) => {
    onDeleteTask(taskId)
  }
  const handleAddTask = ({ taskname }) => {
    const task = {
      name: taskname,
      createdAt: Date.now(),
      isDone: false,
      tags: [...selectedTags],
    };
    onAddTask(task);
  };
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log(nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const onTabChange = (key) => {};

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <>
          <Moment format="DD/MM/YYYY">{moment.utc(date)}</Moment>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small">
            <EditOutlined />
          </Button>
          <Button size="small">Done</Button>
          <Button size="small">
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={()=>deleteTask(record.key)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];
  const data = tasks.map((task) => {
    return {
      key: task.id,
      date: task.createdAt,
      name: task.name,
      tags: task.tags,
    };
  });

  return (
    <>
      <Form layout="inline" className={classes.Todo} onFinish={handleAddTask}>
        <Form.Item
          className={classes.Input}
          name="taskname"
          rules={[
            {
              required: true,
              message: 'Please input task name!',
            },
          ]}
        >
          <Input placeholder="Add Task"></Input>
        </Form.Item>
        <Form.Item className={classes.Button}>
          <Button htmlType="submit" type="primary" loading={loading}>
            Add Task
          </Button>
        </Form.Item>
      </Form>
      <div className={classes.Todo}>
        <span style={{ marginRight: 8, fontWeight: 'bold' }}>Tags:</span>
        {taskTags.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      <div className={classes.Table}>
        <Tabs defaultActiveKey="1" onChange={onTabChange}>
          <TabPane tab="Tasks to do" key="1">
            <Table loading={loading} columns={columns} dataSource={data} />
          </TabPane>
          <TabPane tab="Task done" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

Todo.propTypes = {
  loading: PropTypes.bool.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  onGetTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.task.loading,
  tasks: state.task.tasks,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTask: (task) => dispatch(actions.addTask(task)),
    onGetTask: () => dispatch(actions.getTasks()),
    onDeleteTask: (taskId) => dispatch(actions.deleteTask(taskId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
