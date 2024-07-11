import { useState } from 'react';

interface ModalState {
    minNum: number;
    maxNum: number;
    pointNum: number;
    num: number;
}

interface ModalActions {
    handleMinNumChange: (num: number) => void;
    handleMaxNumChange: (num: number) => void;
    handlePointNumChange: (num: number) => void;
    handleNumChange: (num: number) => void;
    setMinNum: React.Dispatch<React.SetStateAction<number>>;
    setMaxNum: React.Dispatch<React.SetStateAction<number>>;
    setPointNum: React.Dispatch<React.SetStateAction<number>>;
    setNum: React.Dispatch<React.SetStateAction<number>>;
}

const useModal = (): ModalState & ModalActions => {
    const [minNum, setMinNum] = useState<number>(0);
    const [maxNum, setMaxNum] = useState<number>(1);
    const [pointNum, setPointNum] = useState<number>(3);
    const [num, setNum] = useState<number>(0.001);

    const handleMinNumChange = (num: number) => {
        setMinNum(num);
    };

    const handleMaxNumChange = (num: number) => {
        setMaxNum(num);
    };

    const handlePointNumChange = (num: number) => {
        setPointNum(num);
    };

    const handleNumChange = (num: number) => {
        setNum(num);
    };

    return {
        minNum,
        maxNum,
        pointNum,
        num,
        handleMinNumChange,
        handleMaxNumChange,
        handlePointNumChange,
        handleNumChange,
        setMinNum,
        setMaxNum,
        setPointNum,
        setNum,
    };
};

export default useModal;