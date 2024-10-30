<div>
    <h1>WebM Video Converter</h1>

    <form wire:submit="save">
        <input type="file" wire:model="video">

        @error('video') <span class="error">{{ $message }}</span> @enderror

        <button type="submit">Convert Video</button>
    </form>

    <div wire:poll class="my-8">
        <p>Job Status: {{ $jobStatus }}</p>
        @if ($outputVideoLink != null)
            <a href="{{ $outputVideoLink }}" download>Download Converted File</a>
        @endif
    </div>
</div>
