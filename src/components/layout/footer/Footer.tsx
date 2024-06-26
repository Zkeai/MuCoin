"use client"
import React from 'react'
import Icon from '/src/components/custom/Icon';
import Style from '/src/components/components.module.css'


interface SocialUrl {
    github: string;
    youtube: string;
    twitter: string;
    dianbao: string;
    discord: string;
  }

const socialUrl: SocialUrl = {
    github:'https://github.com/zkeai',
    youtube:'https://www.youtube.com/channel/UClhZUsoeyNF5kDZ-OO4y0sw',
    twitter:'https://x.com/lemox66',
    dianbao:'https://t.me/+E3Q1hMARTfozNjQ1',
    discord:'https://discord.gg/TUAP6N3C'
}
const Footer: React.FC = () => {

    const socialclickHandle = (url:string) =>{
        window.open(url, '_blank');
    }
  return (
    <div className=" w-full h-14 flex fixed bottom-0 bg-amber-500  items-center">
        <div className="flex w-1/3 space-x-5 pl-10">
          <Icon  type="icon-smiling_face_with_hearts_flat" size={28} />
          <span className="font-bold">所有美好，不期而遇</span>
        </div>
        <div className="grow"></div>
        <div className="flex w-1/5 space-x-10">
            <Icon className={Style.social} type="icon-github" size={28}  onClick={() => socialclickHandle(socialUrl.github)}/>
            <Icon className={Style.social} type="icon-Youtube-fill" size={28} onClick={() => socialclickHandle(socialUrl.youtube)}/>
            <Icon className={Style.social} type="icon-twitter" size={28} onClick={() => socialclickHandle(socialUrl.twitter)} />
            <Icon className={Style.social} type="icon-dianbao" size={28} onClick={() => socialclickHandle(socialUrl.dianbao)} />
            <Icon className={Style.social} type="icon-discord" size={28} onClick={() => socialclickHandle(socialUrl.discord)} />
        </div>
  
    </div>
  )
}

export default Footer