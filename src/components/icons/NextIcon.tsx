import React from "react";

interface Props{
    readonly color?: string;
    readonly size?: any;
}

export default function NextIcon({color, size = 20}:Props){
    return (
   
        <svg xmlns="http://www.w3.org/2000/svg" className="d-flex justify-content-center align-items-center" fill={color} width={size} height={size} viewBox="0 0 448 512">
            <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
        </svg>
    )
}