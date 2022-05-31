import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import client from '../apollo-client'
import toast from 'react-hot-toast'

type Props = {
  subreddit?: string
}

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}
//* React Hook Form Example
function PostBox({ subreddit }: Props) {
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<Boolean>(false)

  //* Apollo Client - mutation add post
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  })

  //* React Hook Form
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  //* Handle form input, DB mutation, Toast notifications
  const onSubmit = handleSubmit(async (formData) => {
    console.log('Fetching subreddit...')
    //* Display toast message
    const notification = toast.loading('Creating new post...')

    //* Apollo Client - mutations
    try {
      //* Query for subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          //* Use props first, fallback to form
          topic: subreddit || formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0
      console.log(
        'Subreddits found with topic: ',
        formData.subreddit,
        getSubredditListByTopic
      )

      if (!subredditExists) {
        //* Create subreddit...
        console.log('Subreddit is new! -> creating a NEW subreddit!')

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        console.log('Creating post...', formData)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log(newPost)
      } else {
        //* Use existing subreddit...
        console.log('Using existing subreddit!')
        console.log(getSubredditListByTopic)

        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        console.log(newPost)
      }

      //* After post is created, reset form...
      setValue('postTitle', '')
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('subreddit', '')

      //* Display Toast Notifications
      toast.success('New Post created!', {
        id: notification,
      })
    } catch (error) {
      toast.error('Error creating post!', {
        id: notification,
      })
    }
  })

  console.log(subreddit)

  //* React-Hook-Form - watch for changes in form inputs
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-[56px] z-50 rounded-md border-2 border-red-200 bg-white p-2 lg:top-[66px]"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar - Dicebear API  */}
        <Avatar />

        {/* Title */}
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          type="text"
          className="flex-1 p-2 pl-5 rounded-md outline-none bg-gray-50 "
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title!'
              : 'Sign In to post'
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register('postBody')}
              className="flex-1 p-2 m-2 outline-none bg-blue-50"
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {/* Subreddit */}
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                {...register('subreddit', { required: true })}
                className="flex-1 p-2 m-2 outline-none bg-blue-50"
                type="text"
                placeholder="i.e. r/reactjs"
              />
            </div>
          )}

          {/* Image */}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register('postImage')}
                className="flex-1 p-2 m-2 outline-none bg-blue-50"
                type="text"
                placeholder="Upload an image..."
              />
            </div>
          )}

          {/* Handle errors */}
          {Object.keys(errors).length > 0 && (
            <div className="p-2 space-y-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>A post title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>A subreddit is required</p>
              )}
            </div>
          )}

          {/* Submit Post - Watch for changes in input field */}
          {!!watch('postTitle') && (
            <button
              className="w-11/12 p-2 mx-auto mt-2 text-white bg-blue-400 rounded-2xl"
              type="submit"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}
export default PostBox
