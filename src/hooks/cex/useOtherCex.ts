import useCommon, { CommonHookState, CommonHookActions } from './useCommon';

interface OtherExchangeComponentState extends CommonHookState {
    passphrase: string;
}

interface OtherExchangeComponentActions extends CommonHookActions {
    handlePassphraseChange: (event: string) => void;
}

const useOtherExchangeComponent = (): OtherExchangeComponentState & OtherExchangeComponentActions => {
    const apiEndpoint = '/api/cex/other/getAccountInfo';
    const extraParams = {}; // Replace with specific parameters if needed

    const {
        apiKey,
        secretKey,
        passphrase,
        open,
        modalOpen,
        setOpenModal,
        accountInfo,
        textAreaValue,
        setTextAreaVal,
        handleApiKeyChange,
        handleSecretKeyChange,
        handlePassphraseChange, // Added handlePassphraseChange
        handleSwitchChange,
        queryAssetsHandle,
        clearDataHandle,
    } = useCommon('other', apiEndpoint, extraParams, true);

    return {
        apiKey,
        secretKey,
        passphrase,
        open,
        modalOpen,
        setOpenModal,
        accountInfo,
        textAreaValue,
        setTextAreaVal,
        handleApiKeyChange,
        handleSecretKeyChange,
        handlePassphraseChange,
        handleSwitchChange,
        queryAssetsHandle,
        clearDataHandle,
    };
};

export default useOtherExchangeComponent;