'use client';

import React, { useState } from 'react';
import { Card, Typography, Space, Table, Input, Select, Button, Toast } from '@douyinfe/semi-ui';
import { ethers } from 'ethers';
import Upload from '@/components/custom/upload';
import pLimit from 'p-limit'; // 引入p-limit库

const { Title, Paragraph } = Typography;

import Caduceus from '@/job/cad/main';
import {getCadRep,getCadRes,sign,task,cadInvite} from '@/http/api/drop/cad/api'

interface PrivateKeyItem {
  key: string;
  status: string;
  inviter: string;
}

const Page: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [privateKeys, setPrivateKeys] = useState<PrivateKeyItem[]>([]);
  const [damaKey, setDamaKey] = useState<string>('');
  const [inviter, setInviter] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<'sign' | 'invite'>('sign');

  const list = [
    { value: 'sign', label: '每日签到(先绑定邀请)', otherKey: 0 },
    { value: 'invite', label: '邀请绑定(仅需绑定一次)', otherKey: 1 },
  ];

  const isValidPrivateKey = (key: string): boolean => {
    try {
      const wallet = new ethers.Wallet(key);
      return !!wallet.address;
    } catch (error) {
      return false;
    }
  };

  const handleFileUpload = (content: string) => {
    setFileContent(content);
    if (!content.trim()) {
      setPrivateKeys([]);
      return;
    }
    const keys = content.split('\n').filter(key => key.trim() !== '');
    const processedKeys = keys.map(key => ({
      key,
      status: '未处理',
      inviter: '',
    }));
    setPrivateKeys(processedKeys);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const executeSingleTask = async (item: PrivateKeyItem) => {
    const { key, status } = item;

    if (status !== '未处理' && status !== '任务出错') {
      return;
    }

    setPrivateKeys(prevKeys => prevKeys.map(prevKey => 
      prevKey.key === key ? { ...prevKey, status: '正在处理' } : prevKey
    ));

    const isValid = isValidPrivateKey(key);
    let newStatus = '未处理';

    if (isValid) {
      newStatus = '私钥正确';

      try {
        const randomDelay = Math.floor(Math.random() * 3000) + 1000; // 1-3秒随机延迟
        await delay(randomDelay);

        let boo = false;
        let response: any = "";
       
        if (selectedTask === 'sign') {

          while (!boo) {
            const res = await getCadRep({"damaKey":damaKey})
            const resultid = res.data
            const resp = await getCadRes({"damaKey":damaKey,"resultid":resultid})
            response = resp.data
            if (response) {
              boo = true;
            }
          }
          
          const taskId_ = await sign(
            {"captchaId":response.captcha_id,
              "captchaOutput":response.captcha_output,
              "genTime":response.gen_time,
              "lotNumber":response.lot_number,
              "passToken":response.pass_token,
              "key":key
            }
          );
          if (taskId_.data) {
            const res: any= await task({"taskid":taskId_.data});
            if (res.status === 200) {
              newStatus = res.data
            } else {
              newStatus = "签到失败";
            }
          } else {
            newStatus = '获取任务ID失败';
          }

        } else if (selectedTask === 'invite') {
          while (!boo) {
            const res = await getCadRep({"damaKey":damaKey})
            const resultid = res.data 
            const resp = await getCadRes({"damaKey":damaKey,"resultid":resultid})
            response = resp.data 
            if (response) {
              boo = true;
            }
          }


          const res = await cadInvite(    
            {"captchaId":response.captcha_id,
              "captchaOutput":response.captcha_output,
              "genTime":response.gen_time,
              "lotNumber":response.lot_number,
              "passToken":response.pass_token,
              "inviter":inviter,
              "key":key,
            }
          );
          if (res.data.code === 0) {
            newStatus = "绑定成功";
          } else {
            newStatus = "绑定失败";
          }
          
        }

      } catch (error) {
        newStatus = '任务出错';
      }
    } else {
      newStatus = '私钥错误';
    }

    setPrivateKeys(prevKeys => prevKeys.map(prevKey => 
      prevKey.key === key ? { ...prevKey, status: newStatus, inviter: isValid && selectedTask === 'invite' ? inviter : '' } : prevKey
    ));
  };

  const executeTask = async () => {
    if (!damaKey.trim()) {
      Toast.error('请输入打码平台的密钥');
      return;
    }

    if (privateKeys.length === 0) {
      Toast.error('请上传私钥');
      return;
    }

    if (selectedTask === 'invite' && !inviter.trim()) {
      Toast.error('请输入邀请码');
      return;
    }

    const limit = pLimit(3); // 控制并发数为5
    const tasks = privateKeys.map(item => limit(() => executeSingleTask(item)));
    await Promise.allSettled(tasks); // 使用Promise.allSettled代替Promise.all
  };

  const columns = [
    {
      title: '私钥',
      dataIndex: 'key',
      key: 'key',
    },
    ...(selectedTask === 'invite' ? [{
      title: '邀请码',
      dataIndex: 'inviter',
      key: 'inviter',
    }] : []),
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <Space vertical className="w-full">
        <Card className="w-full">
          <div className="flex">
            <Space spacing="loose">
              <Input
                placeholder="请输入打码平台的密钥"
                value={damaKey}
                onChange={(e) => setDamaKey(e as string)}
              />
              <Input
                placeholder="请输入邀请地址(小写)"
                value={inviter}
                onChange={(e) => setInviter(e as string)}
                disabled={selectedTask !== 'invite'}
              />
              <Select
                defaultValue="sign"
                placeholder="请选择任务"
                className="w-[600px]"
                optionList={list}
                value={selectedTask}
                onChange={(value) => {
                  setSelectedTask(value as 'sign' | 'invite');
                  if (value === 'sign') {
                    setInviter(''); // 清空邀请码
                  }
                }}
              />
              <Button theme='solid' type='warning' onClick={executeTask}>开始运行</Button>
            </Space>
          </div>
        </Card>
        <Card className="w-full">
          <Upload
            title="私钥导入"
            fileContent={fileContent}
            setFileContent={handleFileUpload}
          />
          <Table
            columns={columns}
            dataSource={privateKeys}
            pagination={false}
          />
        </Card>
      </Space>
    </div>
  );
};

export default Page;