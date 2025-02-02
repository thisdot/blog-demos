<?php

namespace App\Livewire;

use App\Jobs\ProcessVideo;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\WithFileUploads;

class VideoUploader extends Component
{
    use WithFileUploads;

    /**
     * @var TemporaryUploadedFile
     */
    #[Validate('mimetypes:video/avi,video/mpeg,video/quicktime')]
    public $video;

    public ?string $jobStatus = 'Inactive';

    public ?string $outputVideoLink = null;

    public ?string $outputPath = null;

    public ?string $outputFilename = null;

    public function save(): void
    {
        $this->jobStatus = 'In Progress';
        $this->outputVideoLink = null;
        $this->outputPath = null;
        $this->outputFilename = null;

        // Store the uploaded file and generate the input and output paths of
        // the video to be converted for the job.
        $videoFilename = $this->video->store();
        $videoPath = Storage::disk('local')->path($videoFilename);
        $videoPathInfo = pathinfo($videoPath);
        $this->outputFilename = "{$videoPathInfo['filename']}.webm";
        $this->outputPath = "{$videoPathInfo['dirname']}/{$this->outputFilename}";

        // Add the long-running job onto the queue to be process when possible.
        ProcessVideo::dispatch($videoPath, $this->outputPath);
    }

    public function render(): View
    {
        if ($this->outputPath != null && File::exists($this->outputPath)) {
            // Create a temporary URL that lasts for 10 minutes and allows the
            // user to download the processed video file.
            $this->outputVideoLink = Storage::temporaryUrl(
                $this->outputFilename, now()->addMinutes(10)
            );

            $this->jobStatus = 'Done';
            $this->outputPath = null;
            $this->outputFilename = null;
        }

        return view('livewire.video-uploader', [
            'jobStatus' => $this->jobStatus,
            'outputVideoLink' => $this->outputVideoLink,
        ]);
    }
}
