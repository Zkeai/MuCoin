import useCommon from './useCommon';

const useOtherExchangeComponent = () => {
  const apiEndpoint = '/api/cex/other/getAccountInfo';
  const extraParams = {}; // 如果有特定的额外参数可以在这里设置

  const {
    apiKey,
    secretKey,
    passphrase, // 引入 passphrase
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    textAreaValue,
    setTextAreaVal,
    handleApiKeyChange,
    handleSecretKeyChange,
    handlePassphraseChange, // 引入 handlePassphraseChange
    handleSwitchChange,
    queryAssetsHandle,
    clearDataHandle,
  } = useCommon('other', apiEndpoint, extraParams, true);

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
    queryAssetsHandle,
    clearDataHandle,
  };
};

export default useOtherExchangeComponent;
