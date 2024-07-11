'use client';
import { useEffect, useState, useCallback } from 'react';
import { Button, Table, Select, Notification, Spin } from '@douyinfe/semi-ui';
import networks from '/src/config/rpc.json';
import { IconCopyStroked, IconRedoStroked } from '@douyinfe/semi-icons';

const RpcTest = () => {
  const [results, setResults] = useState<{ [key: string]: number | string | null }>({});
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.name || '');

  const testRpc = async (url: string) => {
    const start = performance.now();
    try {
      const res = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }) 
      });
      if (res.status !== 200) {
        return "error";
      }
      const end = performance.now();
      return end - start;
    } catch (error) {
      return "error";
    }
  };

  const handleTest = useCallback(async () => {
    if (!selectedNetwork) return;

    const network = networks.find(n => n.name === selectedNetwork);
    if (network) {
      setResults(network.rpcs.reduce((acc, url) => ({ ...acc, [url]: null }), {}));

      const promises = network.rpcs.map(url => testRpc(url).then(time => ({ url, time })));
      const resultsArray = await Promise.all(promises);

      const newResults = resultsArray.reduce((acc, result) => {
        acc[result.url] = result.time;
        return acc;
      }, {});

      setResults(newResults);
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (selectedNetwork) {
      handleTest();
    }
  }, [selectedNetwork, handleTest]);

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    setResults({});
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    Notification.success({
      title: '复制',
      content: `RPC: ${url}`,
      duration: 2
    });
  };

  const columns = [
    { title: 'RPC', dataIndex: 'url', key: 'url' },
    { title: '响应时间 (ms)', dataIndex: 'time', key: 'time', render: (text) => (text === "error" ? 'Error' : text !== null ? text.toFixed(2) : <Spin size="small" />) },
    { title: '', key: 'actions', render: (text, record) => (
        <Button size='small' icon={<IconCopyStroked />} theme='outline' type='secondary' onClick={() => copyToClipboard(record.url)}>复制</Button>
      )
    }
  ];

  const data = selectedNetwork
    ? networks
        .find(network => network.name === selectedNetwork)
        ?.rpcs.map(url => ({
          network: selectedNetwork,
          url,
          time: results[url],
        })) || []
    : [];

  return (
    <div className="px-80 py-10">
      <Select
        placeholder="请选择链"
        style={{ width: 400 }}
        value={selectedNetwork}
        onChange={handleNetworkChange}
        optionList={networks.map(network => ({ value: network.name, label: network.name }))}
      />
      <Button icon={<IconRedoStroked />} type='secondary' theme='solid' onClick={handleTest} disabled={!selectedNetwork} className="ml-4 ">
        重新测速
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} className="mt-4" />
    </div>
  );
};

export default RpcTest;