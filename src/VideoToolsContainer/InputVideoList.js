import React from 'react'

const VideoList = ({ inputFileURLList }) => {
    return (
        <div>
            {inputFileURLList?.map((video, ind) => (
                <video controls width={400} height={400} src={video} />
            ))}
        </div>
    )
}

export default VideoList
