'use client';

import React from 'react';
import { Card, Typography, Avatar, Button, Space, Tag } from '@douyinfe/semi-ui';
import { IconLink } from '@douyinfe/semi-icons';

const { Title, Paragraph } = Typography;

const Page = ({projectName, projectUrl, projectIconUrl, projectDescription, investor, financingAmount }) => {
  return (
    <div className="flex flex-col">
      <Card style={{ padding: '30px', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <Space>
            <Button
              type="primary"
              icon={<IconLink />}
              onClick={() => window.open(projectUrl, '_blank')}
            >
              项目链接
            </Button>
          </Space>
        </div>
        <Space align="center" style={{ marginBottom: '20px' }}>
          <Avatar size="large" src={projectIconUrl} />
          <Title heading={3} style={{ margin: 0 }}>
            {projectName}
          </Title>
        </Space>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Tag color="blue">项目说明</Tag>
            <Paragraph>
              {projectDescription}
            </Paragraph>
          </div>
        </Space>
        <Space className="mt-5">
          <div>
            <Tag color="blue">投资方</Tag>
            <Paragraph>
              {investor}
            </Paragraph>
          </div>
        </Space>
        <div className="mt-5">
          <Tag color="blue">融资金额</Tag>
          <Paragraph>
            {financingAmount}
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default Page;