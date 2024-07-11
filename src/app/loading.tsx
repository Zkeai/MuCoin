"use client";
// components/Loading.js
import { Spin } from '@douyinfe/semi-ui';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;