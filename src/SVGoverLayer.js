import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web'

const data = [
    {lng:139.15183, lat:35.7880053}
]


export default ({ viwState }) => {
    const point = data.map(d => viwState.project([d.lng, d.lat]))[0];
    
    const springs = useSpring({
        from: { cx: 0, cy:0, r:4 },
        to: { cx: point[0], y:point[1], r:40 },
      })
    
    return (
        <svg className="svg-overlay">
            {/* サークル */ }
            <circle cx={point[0]} cy={point[1]} r="40" fill={"red"} />
            
            { /* アニメーションサークル */}
            <animated.circle
                style={{
                    width: 80,
                    height: 80,
                    fill: 'blue',
                    fillOpacity:0.5,
                    ...springs,
                }}
            />

        </svg>
    )

}