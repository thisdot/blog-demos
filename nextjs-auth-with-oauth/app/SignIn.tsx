import Image from "next/image";

const loginUrl = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${
  process.env.FACEBOOK_APP_ID
}&redirect_uri=${encodeURI(
  `${process.env.NEXTAUTH_URL}/api/auth/callback/facebook`
)}`;

export function SignIn() {
  return (
    <div>
      <p className="text-base text-cyan-900 mb-7">
        Welcome to This Dot&apos;s demo for Next.js OAuth integration with
        Facebook. Click the below button to sign in.{" "}
      </p>
      <a href={loginUrl}>
        <div className="grid space-y-4">
          <button
            className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
          >
            <div className="relative flex items-center justify-center space-x-4">
              <Image
                src="facebook.svg"
                alt="Facebook logo"
                width="16"
                height="16"
              />
              <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">
                Continue with Facebook
              </span>
            </div>
          </button>
        </div>
      </a>
    </div>
  );
}
