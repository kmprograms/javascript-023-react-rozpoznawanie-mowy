import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const App1 = () => {
    const { transcript, resetTranscript } = useSpeechRecognition()

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    /*
    SpeechRecognition.startListening()
    To start listening to speech, call the startListening function.
    This is an asynchronous function, so it will need to be awaited
    if you want to do something after the microphone has been turned on.
    */

    /*
    SpeechRecognition.stopListening()
    To turn the microphone off, but still finish processing any speech in progress, call stopListening.
    */

    /*
    SpeechRecognition.abortListening()
    To turn the microphone off, and cancel the processing of any speech in
    progress, call abortListening.
    */

    return (
        <div className="container mt-5 border border-3 p-3">
            <button
                className="btn btn-primary me-2"
                onClick={event => SpeechRecognition.startListening({continuous: true, language: 'pl'})}
            >Start</button>

            {/*<button className="btn btn-primary me-2" onClick={SpeechRecognition.startListening}>Start</button>*/}
            <button className="btn btn-secondary me-2" onClick={SpeechRecognition.stopListening}>Stop</button>
            <button className="btn btn-danger" onClick={resetTranscript}>Reset</button>
            <div className="mt-3 border border-1 p-3">
                <p className="h5">{transcript}</p>
            </div>
        </div>
    )
}
export default App1;
