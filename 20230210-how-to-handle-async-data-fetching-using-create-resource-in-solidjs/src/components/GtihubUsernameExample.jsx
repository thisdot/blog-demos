import { createResource, createSignal } from 'solid-js';
import { users, buildingOffice, mapPin, link } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

const GithubExample = () => {
  const [username, setUsername] = createSignal('vyktoremario');
  const fetchGithubUser = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.json();
  };
  const [user] = createResource(username, fetchGithubUser);
  return (
    <>
      <div class="my-8 flex gap-2 items-center justify-center">
        <input
          class="border-2 border-black bg-gray-200 p-3 rounded-md"
          value={username()}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Enter a github username</label>
      </div>
      {user.loading && <p class="text-center justify-center">Loading...</p>}
      {user.error && (
        <p class="text-center justify-center">
          Error occurred in fetching Github user
        </p>
      )}
      {user() && (
        <div class="mx-auto ">
          <img
            src={user().avatar_url}
            alt="Avatar"
            width={260}
            height={260}
            class="rounded-full shadow z-30"
          />
          <h1 class="mt-2">
            <div class="text-2xl text-gray-800 font-bold leading-tight">
              {user().name}
            </div>
            <div class="text-xl text-gray-500 font-light">
              {user().username}
            </div>
          </h1>
          <div class="text-gray-800 mt-4 mb-3">{user().bio}</div>
          <div class="text-sm text-gray-600 my-">
            <Icon path={users} class="w-4 h-4 mb-0.5 mr-1 inline-block" />
            <span class="inline-block">
              <span class="font-medium text-gray-900">{user().followers}</span>{' '}
              followers
            </span>
            <span class="mx-1">·</span>
            <span class="inline-block">
              <span class="font-medium text-gray-900">{user().following}</span>{' '}
              following
            </span>
          </div>
          <div class="text-sm text-gray-800 space-y-1">
            {user().company && (
              <div>
                <Icon
                  path={buildingOffice}
                  class="w-4 h-4 mb-0.5 mr-1 inline-block"
                />
                {user().company}
              </div>
            )}
            {user().location && (
              <div>
                <Icon path={mapPin} class="w-4 h-4 mb-0.5 mr-1 inline-block" />
                {user().location}
              </div>
            )}
            {user().url && (
              <div>
                <Icon path={link} class="w-4 h-4 mb-0.5 mr-1 inline-block" />
                <a
                  class="hover:text-blue-600 hover:underline"
                  href={user().url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user().url}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GithubExample;
