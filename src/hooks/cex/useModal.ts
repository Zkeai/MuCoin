import { useState, useEffect } from 'react';


const useModal = () => {
    const [minNum,setMinNum] = useState(0)
    const [maxNum,setMaxNum] = useState(1)
    const [pointNum,setPointNum] = useState(3)
    const [num,setNum] = useState(0.001)


    const handleMinNumChange = (num) => {
        setMinNum(num)
    }
    const handleMaxNumChange = (num) => {
        setMaxNum(num)
    }
    const handlePointNumChange = (num) => {
        setPointNum(num)
    }
    const handleNumChange = (num) => {
        setNum(num)
    }





    return{
        minNum,
        maxNum,
        pointNum,
        num,
        setMinNum,
        setMaxNum,
        setPointNum,
        setNum
    }
}


export default useModal