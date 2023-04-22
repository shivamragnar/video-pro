import React from 'react'

const VideoOutput = ({ outputFile }) => {
    console.log('Testing output file', outputFile)
    return (
        <>
            <br />
            <h5>Output file</h5>
            {outputFile && <video controls width={200} src={outputFile} />}
        </>
    )
}

export default VideoOutput
