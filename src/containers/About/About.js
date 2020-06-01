import React from 'react';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
export const About = () => {
  const clock = <ClockCircleOutlined />;
  return (
    <div style={{ margin: '10px auto' }}>
      <Timeline>
        <Timeline.Item label="NUCE" position="right">
          2011
        </Timeline.Item>
        <Timeline.Item label="ESTP" position="right">
          2015
        </Timeline.Item>
        <Timeline.Item dot={clock} color="red" label="Egis" position="right">
          2018
        </Timeline.Item>
      </Timeline>
    </div> 
  );
};

export default About;
