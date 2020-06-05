import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Timeline, Typography } from 'antd';
import moment from 'moment';
import * as actions from '../../redux/actions';
const Planning = ({ tasks }) => {
  let obj = {};

  for (const key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      const task = tasks[key];
      const date = moment.utc(task.createdAt).format('YYYY-MM-DD');
      if (!obj[date]) {
        obj[date] = task.name;
      } else {
        obj[date] += '\n' + task.name;
      }
    }
  }

  const timeline = Object.keys(obj).map((key) => (
    <Timeline.Item key={key}>
      <Typography.Text>{key}</Typography.Text>
      <br />
      <Typography.Text style={{ whiteSpace: 'pre-line' }}>
        {obj[key]}
      </Typography.Text>
    </Timeline.Item>
  ));

  return (
    <div  style={{ margin: '10px auto' }}>
      <Timeline style={{ margin: '10px auto' }}>{timeline}</Timeline>
    </div>
  );
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
    onGetDoneTask: () => dispatch(actions.getDoneTasks()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'tasks',
      where: [['isDone', '==', true]],
    },
  ]),
)(Planning);
