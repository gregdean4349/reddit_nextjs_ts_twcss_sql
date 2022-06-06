import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import { ADD_COMMENT } from '../../graphql/mutations'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  })

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const post: Post = data?.getPostListByPostId

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading('Posting your comment...')

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    })
    console.log(data)
    setValue('comment', '')

    toast.success('Comment posted!', {
      id: notification,
    })
  }

  console.log(data)

  return (
    <div className="max-w-5xl mx-auto my-7">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-b-0 border-gray-300 bg-white pb-8 pl-[88px] pr-16">
        <p className="text-sm font-semibold">
          Comment as{' '}
          <span className="font-light text-red-500">{session?.user?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-1 space-y-5"
        >
          <textarea
            {...register('comment')}
            disabled={!session}
            placeholder={
              session ? 'What are your thoughts?' : 'Sign in to comment'
            }
            className="h-24 w-full rounded-md border border-gray-200
          p-2 pl-4 text-lg font-[400] text-gray-500 outline-none disabled:bg-gray-50"
          />

          <button
            disabled={!session}
            className="w-full p-3 mx-auto text-xl text-white bg-red-400 text-semibold rounded-2xl disabled:bg-gray-200"
            type="submit"
          >
            Submit your comment
          </button>
        </form>
      </div>

      <div className="px-10 py-5 -my-5 bg-white border border-t-0 border-gray-300 rounded-b-md pb-9">
        <hr className="py-2" />

        {post?.comments.map((comment) => (
          <div
            key={comment.id}
            className="relative flex items-center pb-2 my-3 space-x-2 space-y-4 border border-gray-100 rounded-md bg-gray-50"
          >
            <hr className="absolute z-0 h-10 border-2 border-red-200 top-10 left-7" />

            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600 cursor-pointer hover:text-red-400 hover:underline">
                  {comment.username}
                </span>{' '}
                ♾ <TimeAgo date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PostPage
