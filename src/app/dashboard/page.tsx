'use client';

import React, { useEffect } from 'react';
import Newland from '/src/job/newland/main.ts';

const Page = () => {
  const handleClick = async () => {
    const newland = new Newland("0xb75f64aa288b95f558de6877b7687eab2df60380a8e23807b57e321a680a8b28");

    try {
      const nonce = await newland.getNonce();
      

      // Now proceed to login
      const res = await newland.login(nonce);
      const userid= res.data.id

      //dailycheck
      const response = await newland.dailyCheck("2024","7")
      console.log(response)

      //updateName
      const data = await newland.updateName(userid)
      console.log(data)

      //updateAvator
      const avatorData = await newland.updateAvator(userid)
      console.log(avatorData)

      //查分
      const point = await newland.getReward(userid)
      console.log(point)
    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <div>
      <button onClick={handleClick}>测试</button>
    </div>
  );
};

export default Page;