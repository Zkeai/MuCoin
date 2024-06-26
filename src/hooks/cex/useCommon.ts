import { useState, useEffect } from 'react';


const useCommon = (exchangeName, requirePassphrase = false) => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [passphrase, setPassphrase] = useState(''); // 新增 passphrase 状态
  const [textAreaValue, setTextareaValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    const cexCredentials = JSON.parse(localStorage.getItem('cexInfo'))?.find(credentials => credentials.hasOwnProperty(exchangeName));
    if (cexCredentials) {
      const { apiKey, secretKey, passphrase } = cexCredentials[exchangeName];
      if (apiKey) setApiKey(apiKey);
      if (secretKey) setSecretKey(secretKey);
      if (passphrase) setPassphrase(passphrase); // 加载 passphrase
    }
  }, [exchangeName]);

  const handleApiKeyChange = (event) => {
    setApiKey(event);
  };

  const handleSecretKeyChange = (event) => {
    setSecretKey(event);
  };

  const handlePassphraseChange = (event) => { // 新增 handlePassphraseChange
    setPassphrase(event);
  };

  const handleSwitchChange = (checked) => {
    setOpen(checked);
  };

  const clearDataHandle = () => {
    localStorage.clear("cexInfo");
    setApiKey('');
    setSecretKey('');
    setPassphrase(''); // 清除 passphrase
  };

  const setOpenModal = (event) => {
    setModalOpen(event);
  };

  const setTextAreaVal = (event) => {
    setTextareaValue(event);
  };



  return {
    apiKey,
    secretKey,
    passphrase, // 返回 passphrase
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    textAreaValue,
    setTextAreaVal,
    handleApiKeyChange,
    handleSecretKeyChange,
    handlePassphraseChange, // 返回 handlePassphraseChange
    handleSwitchChange,
    clearDataHandle,
    setAccountInfo
  };
};

export default useCommon;
