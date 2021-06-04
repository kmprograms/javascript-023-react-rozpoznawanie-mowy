import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const App2 = () => {
    const [message, setMessage] = useState('')
    const commands = [
        // Pod * bedzie podstawione wszystko co powiesz po 'Wybieram kolor'
        {
            command: 'Wybieram kolor *',
            callback: (color) => setMessage(`Wybrano kolor: ${color}`)
        },
        // Pod :hobby bedzie podstawione jedno slowo
        {
            command: ':hobby to moje ulubione hobby',
            callback: (hobby) => setMessage(`Wybrano hobby ${hobby}`)
        },
        {
            command: 'Moje ulubione dyscypliny sportu to * oraz *',
            callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
        },
        {
            command: 'Czy możesz do mnie (proszę) zadzwonić',
            callback: () => setMessage('Zaplanowano rozmowę telefoniczną')
        },
        {
            command: ['Cześć', 'Dzień dobry'],
            callback: ({ command }) => setMessage(`Powitanie: ${command}`),
            // Powinno sie to ustawiać tylko dla prostych poleceń
            // Ta opcja pozwala dopasowywać wyniki już z częściowych fragmentów tego co powiedziano
            // Dobrze sprawdza sie w przypadku prostych wyrażeń i pozwala przyśpieszyć proces dopasowania
            // jednak może dawać błędne wyniki przy dłuższych wyrażeniach
            matchInterim: true
        },
        {
            command: 'Second',
            callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
            // Zamiast dokładnego dopasowania możemy ustawiać dopasowanie na podstawie współczynnika i jeżeli wyrażenie
            // będzie podobne do wzorca w pewnym stopniu ( wartość współczynnika fuzzyMatchingThreshold ) to wtedy
            // może to wyrażenie zostać potraktowane jako wzorzec
            // Jest ot ustawienie przydatne dla takich wyrażeń które są często przekręcane w wymowie
            // Mechanizm "fuzzy matching" postara się je dopasować.
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2
        },
        {
            command: 'Clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({commands});

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
        <div className="container mt-5 border border-3 p-3">
            <button className="btn btn-primary me-2" onClick={SpeechRecognition.startListening}>Start</button>
            <button className="btn btn-secondary me-2" onClick={SpeechRecognition.stopListening}>Stop</button>
            <button className="btn btn-danger" onClick={resetTranscript}>Reset</button>
            <div className="mt-3 border border-1 p-3">
                <p className="h5">{transcript}</p>
                <p className="h5">{message}</p>
            </div>
        </div>
    )
}
export default App2
