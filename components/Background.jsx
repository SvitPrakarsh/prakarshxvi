import React, { useEffect, useRef } from "react";
import swirl from '../Animations/swirl';
import shift from '../Animations/shift';

export default function Background(){
const ref1 = useRef(null);
const ref2 = useRef(null);
useEffect(()=>{
shift({a:ref1.current, b:ref2.current})
});

    return (
        <div className="background">
            <canvas ref={ref1}> </canvas>
            <canvas ref={ref2}> </canvas>
        </div>
    );
}