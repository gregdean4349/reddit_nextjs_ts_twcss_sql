import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-7">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* PostBox - React Hook Form, StepZen, Apollo/ClientSide SQL actions, React Hot Toast */}
      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home
