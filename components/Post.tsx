import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'

type Props = {
  post: Post
}

function Post({ post }: Props) {
  return (
    <div className="flex bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border hover:border-gray-600">
      {/* Votes */}
      <div className="flex flex-col items-center justify-start p-4 space-y-1 text-gray-400 rounded-l-md bg-gray-50">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-xs font-bold text-black">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>

      <div className="p-3 pb-1 bg-white">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit[0]?.topic}
            </span>{' '}
            ⚛ Posted by u/
            {post.username} ♾ {''}
            <TimeAgo date={post.created_at} />
          </p>
        </div>
        {/* Body */}
        <div className="py-4">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-sm font-normal">{post.body}</p>
        </div>
        {/* Image */}
        <img src={post.image} alt="" className="w-full" />
        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatAltIcon className="w-6 h-6" />
            <p>{post.comments.length} Comments</p>
          </div>
          <div className="postButtons">
            <GiftIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons">
            <ShareIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          <div className="postButtons">
            <BookmarkIcon className="w-6 h-6" />
            <p className="hidden sm:inline">Save</p>
          </div>
          <div className="postButtons">
            <DotsHorizontalIcon className="w-6 h-6" />
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Post
