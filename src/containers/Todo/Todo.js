import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
const Todo = ({
  loading,
  onAddTask,
  tasks,
  finishedTasks,
  onUpdateTask,
  onDeleteTask,
  onGetDoneTask,
}) => {
  useEffect(() => {}, []);

  const [selectedTags, setSelectedTags] = useState([taskTags[0]]);

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  const handleUpdateTask = (task) => {
    const updatedTask = {
      ...task,
      isDone: true,
    };
    onUpdateTask(updatedTask);
  };
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
    setSelectedTags(nextSelectedTags);
  };
  const onTabChange = (key) => {
    if (key === '2') onGetDoneTask();
  };

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
          <Button size="small" onClick={() => handleUpdateTask(record)}>
            Done
          </Button>
          <Button size="small">
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => handleDeleteTask(record.key)}
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
  const fetchedTasks = [];
  for (let key in tasks) {
    if (tasks[key]) {
      fetchedTasks.push({
        ...tasks[key],
        id: key,
      });
    }
  }

  const data = fetchedTasks.reverse().map((task) => {
    return {
      key: task.id,
      date: task.createdAt,
      name: task.name,
      tags: task.tags,
    };
  });

  const dataFinishedTask = finishedTasks.map((task)=>{
    return {
      key: task.key,
      date: task.createdAt,
      name: task.name,
      tags: task.tags,
    };
  })
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
          <Table loading={loading} columns={columns} dataSource={dataFinishedTask} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

Todo.propTypes = {
  loading: PropTypes.bool.isRequired,
  finishedTasks:PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onGetDoneTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    loading: state.task.loading,
    tasks: state.firestore.data.tasks,
    finishedTasks: state.task.finishedTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTask: (task) => dispatch(actions.addTask(task)),
    onDeleteTask: (taskId) => dispatch(actions.deleteTask(taskId)),
    onUpdateTask: (task) => dispatch(actions.updateTask(task)),
    onGetDoneTask: () => dispatch(actions.getDoneTasks()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'tasks',
      where: [['isDone', '==', false]],
    },
  ]),
)(Todo);
