import "./globals.css";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { UserInformation } from "@/app/UserInformation";
import { SignIn } from "@/app/SignIn";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full bg-gradient-to-br from-sky-50 to-gray-200 py-16">
      <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="flex justify-center mb-7 ">
                <a href="https://www.thisdot.co/">
                  <Image
                    src="td.svg"
                    alt="This Dot logo"
                    height="200"
                    width="200"
                    priority={false}
                  />
                </a>
              </div>
              {session?.user?.name ? (
                <UserInformation username={session?.user.name} />
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
