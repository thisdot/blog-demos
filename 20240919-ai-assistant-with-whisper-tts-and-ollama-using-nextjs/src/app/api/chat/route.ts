import { toFile } from 'openai';
import { getOpenai } from '@/utils/get-openai';
import { ollama } from 'ollama-ai-provider';
import { NextResponse } from 'next/server';
import { generateText } from 'ai';

const openai = getOpenai();

export async function POST(req: Request) {
    const { audio } = await req.json();
    const audioBuffer = Buffer.from(audio, 'base64');

    try {
        const audioFile = await toFile(audioBuffer, 'audio.mp3');

        const transcription = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: audioFile,
        });

        const { text: response } = await generateText({
            model: ollama('llama3.1'),
            system: 'You know a lot about video games',
            prompt: transcription.text,
        });

        const voiceResponse = await openai.audio.speech.create({
            model: 'tts-1',
            input: response || '',
            voice: 'onyx',
        });

        return new Response(voiceResponse.body, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {
                err: err,
                error: 'Error converting audio',
            },
            {
                status: 500,
            }
        );
    }
}
