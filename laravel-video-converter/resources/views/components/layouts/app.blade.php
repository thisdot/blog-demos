<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>WebM Video Converter</title>

        <style>
            html {
                font-family: sans-serif;
                background-color: #eaeaea;
            }

            main {
                max-width: 1000px;
                margin: 100px auto 0 auto;
                padding: 32px;
                border-radius: 24px;
                background-color: white;
            }

            h1 {
                margin-top: 0;
            }

            a {
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <main>
            {{ $slot }}

            <footer>
                Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
            </footer>
        </main>
    </body>
</html>
