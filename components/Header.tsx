import Image from 'next/image'
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 bg-white shadow-sm">
      <div className="relative flex-shrink-0 w-20 h-10 cursor-pointer">
        <Image
          src="https://links.papareact.com/fqy"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="w-5 h-5" />
        <p className="flex-1 hidden ml-2 lg:inline">Home</p>
        <ChevronDownIcon className="w-5 h-5 mt-1" />
      </div>

      <form className="flex items-center flex-1 px-3 py-1 space-x-2 bg-gray-100 border border-gray-200 rounded-md">
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit..."
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden></button>
      </form>

      <div className="items-center hidden mx-4 space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-200" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="flex items-center ml-4 lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Sign In / Sign Out button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="items-center hidden p-2 space-x-2 border border-gray-200 rounded-lg cursor-pointer lg:flex"
        >
          <div className="relative flex-shrink-0 w-5 h-5">
            <Image
              layout="fill"
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          <div className="text-xs ">
            <p className="font-bold truncate">u/{session?.user?.name}</p>
            <p className="text-gray-400">🍎 1 Karma</p>
          </div>

          <ChevronDownIcon className="flex-shrink-0 w-5 h-5 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="items-center hidden p-2 space-x-2 border border-gray-200 cursor-pointer lg:flex"
        >
          <div className="relative flex-shrink-0 w-5 h-5">
            <Image
              layout="fill"
              objectFit="contain"
              src="https://links.papareact.com/23l"
              alt=""
            />
          </div>

          <p className="font-semibold text-green-400 underline">Sign In</p>
        </div>
      )}
    </header>
  )
}
export default Header
