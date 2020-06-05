import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { Timeline, Typography } from 'antd';
import moment from 'moment';
import * as actions from '../../redux/actions';
const Planning = ({ onGetDoneTask, finishedTasks }) => {
  useEffect(() => {
    onGetDoneTask();
  }, [onGetDoneTask]);
  let obj = {};

  for (const key in finishedTasks) {
    if (finishedTasks.hasOwnProperty(key)) {
      const task = finishedTasks[key];
      const date = moment.utc(task.createdAt).format('dddd, YYYY-MM-DD');
      if (!obj[date]) {
        obj[date] = task.name;
      } else {
        obj[date] += '\n' + task.name;
      }
    }
  }

  const timeline = Object.keys(obj).map((key) => (
    <Timeline.Item key={key}>
      <Typography.Text style={{fontWeight:'bold'}}>{key}</Typography.Text>
      <br />
      <Typography.Text style={{ whiteSpace: 'pre-line' }}>
        {obj[key]}
      </Typography.Text>
    </Timeline.Item>
  ));

  return (
    <div style={{ margin: '10px auto' }}>
      <Timeline  mode="alternate"   pending="Recording..." style={{ margin: '10px auto' }}>{timeline}</Timeline>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.task.loading,

    finishedTasks: state.task.finishedTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoneTask: () => dispatch(actions.getDoneTasks()),
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(Planning);
