import { useState, useEffect, ChangeEvent } from 'react';

// Define the interface for the credentials stored in localStorage
interface Credentials {
  apiKey: string;
  secretKey: string;
  passphrase?: string;
}

// Define the interface for the hook's return values
interface UseCommonReturn {
  apiKey: string;
  secretKey: string;
  passphrase?: string;
  open: boolean;
  modalOpen: boolean;
  setOpenModal: (event: boolean) => void;
  accountInfo: any[];
  textAreaValue: string;
  setTextAreaVal: (event: string) => void;
  handleApiKeyChange: (event: string) => void;
  handleSecretKeyChange: (event: string) => void;
  handlePassphraseChange?: (event: string) => void;
  handleSwitchChange: (checked: boolean) => void;
  clearDataHandle: () => void;
  setAccountInfo: (info: any[]) => void;
}

const useCommon = (exchangeName: string, requirePassphrase: boolean = false): UseCommonReturn => {
  const [apiKey, setApiKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>(''); // 新增 passphrase 状态
  const [textAreaValue, setTextareaValue] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [accountInfo, setAccountInfo] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('cexInfo');
    const cexCredentials = storedData ? JSON.parse(storedData).find((credentials: any) => credentials.hasOwnProperty(exchangeName)) : null;
    if (cexCredentials) {
      const { apiKey, secretKey, passphrase } = cexCredentials[exchangeName];
      if (apiKey) setApiKey(apiKey);
      if (secretKey) setSecretKey(secretKey);
      if (passphrase) setPassphrase(passphrase); // 加载 passphrase
    }
  }, [exchangeName]);

  const handleApiKeyChange = (event: string) => {
    setApiKey(event);
  };

  const handleSecretKeyChange = (event: string) => {
    setSecretKey(event);
  };

  const handlePassphraseChange = (event: string) => { // 新增 handlePassphraseChange
    setPassphrase(event);
  };

  const handleSwitchChange = (checked: boolean) => {
    setOpen(checked);
  };

  const clearDataHandle = () => {
    localStorage.removeItem("cexInfo");
    setApiKey('');
    setSecretKey('');
    setPassphrase(''); // 清除 passphrase
  };

  const setOpenModal = (event: boolean) => {
    setModalOpen(event);
  };

  const setTextAreaVal = (event: string) => {
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