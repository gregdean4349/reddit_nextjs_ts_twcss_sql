import { useQuery } from '@apollo/client'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'

const Home = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 8,
    },
  })

  const subreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="max-w-5xl mx-auto my-6">
      <PostBox />

      <div className="flex">
        <Feed />

        <div className="sticky top-[171px] ml-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="p-4 pb-3 mb-1 font-bold text-md">Top Communities</p>

          <div>
            {subreddits?.map((subreddit, index) => (
              <SubredditRow
                key={subreddit.id}
                index={index}
                topic={subreddit.topic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
