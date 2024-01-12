import { getEpisodes } from '@/spotify/spotify';

export default async function Home() {
  const modernWebShowId = '5FGA58foRFkJ6IgJbCFYgm';
  const show = await getEpisodes(modernWebShowId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {show.episodes.items.map(
          // @ts-ignore
          (episode) => <a
            key={episode.id}
            href={episode.external_urls.spotify}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {episode.name}{' '}
              <span
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {episode.description}
            </p>
          </a>)}
      </div>
    </main>
  )
}
