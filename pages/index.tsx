import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home">
    <h1>Hello Welcome 👋</h1>
    <p>
      <Link href="/characters/1">Get list</Link>
    </p>
  </Layout>
)

export default IndexPage
