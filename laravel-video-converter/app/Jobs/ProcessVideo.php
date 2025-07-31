<?php

namespace App\Jobs;

use FFMpeg\FFMpeg;
use FFMpeg\Format\Video\WebM;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\File;

class ProcessVideo implements ShouldQueue
{
    use Queueable;

    private string $videoPath;

    private string $outputPath;

    public function __construct(string $videoPath, string $outputPath)
    {
        $this->videoPath = $videoPath;
        $this->outputPath = $outputPath;
    }

    public function handle(): void
    {
        $tempOutputPath = "{$this->outputPath}.tmp";

        // Convert the video to the WebM container format (SLOW).
        $video = FFMpeg::create()->open($this->videoPath);
        $video->save(new WebM, $tempOutputPath);
        File::move($tempOutputPath, $this->outputPath);
    }
}
