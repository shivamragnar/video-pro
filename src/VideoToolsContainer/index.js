import React, { useEffect, useState } from 'react'
import VideoInput from './VideoInput'
import VideoOutput from './VideoOutput'
import VideoTools from './VideoTools'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import VideoList from './InputVideoList'

const ffmpeg = createFFmpeg({ log: true })

// const ffmpegCommands = {
//     trim: (start, end) => 
// }

const outputFileName = 'outputFile.mp4'

const VideoToolsContainer = () => {
  const [ready, setReady] = useState(false)
  const [videoFiles, setVideoFiles] = useState([])
  const [outputFile, setOuptFile] = useState()
  const [inputFileURLList, setInputFileURLList] = useState([])

  // Loads FFMPEG library
  const load = async () => {
    ffmpeg.load()
    setReady(true)
  }

  // Trims selected video
  // from start and end provided in the arguments
  const trimVideo = async (start, end) => {
    console.log('testing start, end', start, end, typeof start)
    const operationalVideo = videoFiles?.[0] // (selecting first video in the list for now)
    const { name: inputFileName, type } = operationalVideo

    // Give video to memory/ffmpeg
    ffmpeg.FS('writeFile', inputFileName, await fetchFile(operationalVideo))

    // Trim video
    await ffmpeg.run('-i', inputFileName, '-ss', start, '-to', end, outputFileName)
    // await ffmpeg.run(`-i ${inputFileName} -ss ${start} -to ${end} outputFile.mp4`)

    // fetch result
    const data = ffmpeg.FS('readFile', outputFileName)
    // downloadFile(data?.buffer)
    const outputURL = URL.createObjectURL(new Blob([data?.buffer], { type }))
    setOuptFile(outputURL)
  }

  // Function to download file/output file
  const downloadFile = (buffer) => {
    const url = window.URL.createObjectURL(
      new Blob([buffer]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `output.mp4`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  const handleMergeVideos = async () => {
    console.log('handleMergeVideos')
    // Form a list of videos to be merged
    // for now we will mege all the videos in the list --- TODO - only merge selected videos

    let concatenatedString = 'concat:'
    for (let i = 0; i < videoFiles.length; i++) {
         const { name } = videoFiles[i];
        ffmpeg.FS('writeFile', name, await fetchFile(videoFiles[i]))
        concatenatedString += i === 0 ? name : ('|' + name)
    }

    console.log('concatenated string', concatenatedString)
    // await ffmpeg.run('-i', concatenatedString, '-filter_complex', '"[0:v:0][0:a:0][1:v:0][1:a:0][2:v:0][2:a:0]concat=n=3:v=1:a=1[outv][outa]"', '-map', '"[outv]"', '-map', '"[outa]"', 'output123.mp4')
    await ffmpeg.run('-i', concatenatedString, '-c', 'copy', 'output123.mp4')

    console.log('after ffmpeg run')

    // Read the result
    const data = ffmpeg.FS('readFile', 'output123.mp4')
    console.log('after ffmpeg data==== run')
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' })
    const url = URL.createObjectURL(videoBlob)

    downloadFile(data?.buffer)
    setOuptFile(url)
  }

  useEffect(() => {
    load()
  }, [])
  console.log('inputfileurllist', inputFileURLList)
  return (
    <>
      {ready && (
        <>
          <h4>Input video List</h4>
          <VideoList inputFileURLList={inputFileURLList} />
          <br />
          <VideoInput setVideoFiles={setVideoFiles} setInputFileURLList={setInputFileURLList} />
          <br />
          <VideoTools trimVideo={trimVideo} handleMergeVideos={handleMergeVideos} disable={videoFiles?.length <= 1} />
          <br />
          <VideoOutput outputFile={outputFile} />
        </>
      )}
      {!ready && <h5 color='red'>Loading FFMPEG</h5>}
    </>
  )
}

export default VideoToolsContainer
