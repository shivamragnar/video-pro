import React, { useState } from 'react'

const INITIAL_TRIM_RANGE = {
    start: 0,
    end: 2,
}

const VideoTools = ({ trimVideo, handleMergeVideos }) => {
    const [trimRange, setTrimRange] = useState(INITIAL_TRIM_RANGE)

    const handleUpdateTrimRange = (type, val) => {
        setTrimRange(cr => {
            return {
                ...cr, 
                [type]: val
            }
        })
    }

    return (
        <>
            <div>
                <input type={'number'} label="Start" onChange={(e) => handleUpdateTrimRange('start', e.target.value)} />
                <input type={'number'} label="End" onChange={(e) => handleUpdateTrimRange('end', e.target.value)} />
            </div>
            <button onClick={() => trimVideo(trimRange.start, trimRange.end)}>Trim Video</button>
            <button onClick={handleMergeVideos}>MergeVideos</button>
        </>
    )
}

export default VideoTools
