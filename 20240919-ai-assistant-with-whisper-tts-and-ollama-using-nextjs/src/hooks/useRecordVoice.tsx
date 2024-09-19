import { useEffect, useRef, useState } from 'react';
import { transformBlobToBase64 } from '@/utils/transform-blob-to-base64';

export function useRecordVoice() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    const audioChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        if (!navigator?.mediaDevices) {
            console.error('Media devices not supported');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        setIsRecording(true);
        setMediaRecorder(mediaRecorder);
        mediaRecorder.start(0);
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            setIsRecording(false);
            mediaRecorder.stop();
        }
    };

    async function getResponse(audioBlob: Blob) {
        const audioBase64 = await transformBlobToBase64(audioBlob);

        try {
            setLoading(true);
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ audio: audioBase64 }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Error getting response');
            }

            const audioContext = new AudioContext();
            const reader = res.body?.getReader();
            if (!reader) {
                throw new Error('Error getting response');
            }
            const source = audioContext.createBufferSource();

            let audioChunks: Uint8Array[] = [];
            let isDataStreamed = false;
            while (!isDataStreamed) {
                const { value, done } = await reader.read();

                if (done) {
                    isDataStreamed = true;
                    break;
                }

                if (value) {
                    audioChunks.push(value);
                }
            }

            const audioBuffer = new Uint8Array(
                audioChunks.reduce(
                    (acc, val) => acc.concat(Array.from(val)),
                    [] as number[]
                )
            );

            source.buffer = await audioContext.decodeAudioData(
                audioBuffer.buffer
            );

            source.connect(audioContext.destination);
            source.start(0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, {
                    type: 'audio/mp3',
                });
                void getResponse(audioBlob);
                audioChunks.current = [];
            };
        }
    }, [mediaRecorder]);

    return {
        startRecording,
        stopRecording,
        isRecording,
        loading,
    };
}
