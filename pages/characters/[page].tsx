import { useState } from "react";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { Character } from "../../interfaces";
import Layout from "../../components/Layout";
import List from '../../components/List'

type Props = {
  characters: Character[];
  currentPage: string;
};

const Characters = ({ characters, currentPage }: Props) => {
  const [page, setPage] = useState(parseInt(currentPage));

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const isNextDisabled = characters.length < 25;

  return (
    <Layout title="Characters">
      <h1>Characters List</h1>
      <List items={characters} />
      <div>
        {page > 1 && (
          <button type="button" onClick={handlePreviousPage}>
            <Link href={`/characters/${page - 1}`}>Previous</Link>
          </button>
        )}
        <button type="button" onClick={handleNextPage} disabled={isNextDisabled}>
          <Link href={`/characters/${page + 1}`}>Next</Link>
        </button>
      </div>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: 5 }, (_, i) => ({
    params: { page: `${i + 1}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = params?.page || "1";
  const res = await fetch(
    `http://localhost:3000/api/characters?page=${currentPage}`
  );
  const data = await res.json();

  return {
    props: {
      characters: data,
      currentPage,
    },
  };
};

export default Characters
