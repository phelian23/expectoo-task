import { GetStaticProps, GetStaticPaths } from 'next'

import { Character } from '../../../interfaces'
import Layout from '../../../components/Layout'
import ListDetail from '../../../components/ListDetail'

type Props = {
  item?: Character
  errors?: string
}

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'Character Detail'
      }`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/characters');
  const data = await res.json();

  const paths = data.map((character) => ({
    params: { id: character.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const res = await fetch(`http://localhost:3000/api/characters?id=${id}`)
    const item = await res.json()

    return { props: { item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
