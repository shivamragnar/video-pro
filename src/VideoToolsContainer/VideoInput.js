import React from 'react'

const VideoInput = ({ setVideoFiles, setInputFileURLList }) => {

    const handleSelectVideoFile = (e) => {
        const files = e.target.files
        setVideoFiles(files)

        // Create video URL's
        const inputFileURLList = []
        for (let i = 0; i < files.length; i++) {
            inputFileURLList.push(URL.createObjectURL(files[i]))
        }
        setInputFileURLList(inputFileURLList)
    }
    return (
        <>
            <br />
            <input type={'file'} multiple accept="video/mp4,video/x-m4v,video/*" onChange={handleSelectVideoFile} />
        </>
    )
}

export default VideoInput
