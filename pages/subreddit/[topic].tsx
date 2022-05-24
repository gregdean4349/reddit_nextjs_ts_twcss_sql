import { useRouter } from 'next/router'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'

function Subreddit() {
  const {
    query: { topic },
  } = useRouter()

  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <div className="mt-10 -mx-8 bg-white">
        <div className="flex items-center max-w-5xl pb-3 mx-auto space-x-4">
          <div className="-mt-5">
            <Avatar large seed={topic as string} />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
        <div>
          <PostBox />
          <Feed />
        </div>
      </div>
    </div>
  )
}
export default Subreddit
