'use client';
import { useRecordVoice } from '@/hooks/useRecordVoice';

export default function AudioRecorder() {
    const { isRecording, stopRecording, startRecording, loading } =
        useRecordVoice();
    async function handleClick() {
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
}
