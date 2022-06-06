import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Avatar from './Avatar'

type Props = {
  topic: string
  index: number
}

function SubredditRow({ topic, index }: Props) {
  return (
    <div className="flex items-center px-4 py-2 space-x-2 space-y-2 bg-white border-t last:rounded-b">
      <p className="text-sm font-bold">{index + 1}</p>
      <ChevronUpIcon className="w-4 h-4 text-green-400 shrink-0" />
      <Avatar seed={topic} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="px-3 py-1 text-white bg-blue-500 rounded-full cursor-pointer ">
          View
        </div>
      </Link>
    </div>
  )
}
export default SubredditRow
