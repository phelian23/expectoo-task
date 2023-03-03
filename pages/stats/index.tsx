import { GetStaticProps } from 'next'
import { Character } from '../../interfaces'
import List from '../../components/List'
import Layout from '../../components/Layout'
import Style from './stats.module.css'

type Props = {
  allCharacters: Character[]
}

const Stats = ({ allCharacters }: Props) => {
  const topThree = allCharacters.sort((a, b) => b.episode.length - a.episode.length).slice(0, 3)

  const getMostCommonStatus = () => {
    const statusMap = allCharacters.reduce((acc, character) => {
      if (!acc[character.status]) {
        acc[character.status] = 0;
      }
      acc[character.status]++;
      return acc;
    }, {} as Record<string, number>);
  
    const sortedStatus = Object.entries(statusMap).sort((a, b) => b[1] - a[1]);
    return sortedStatus[0][0];
  }
  
  const getMostCommonSpeciesWithFemaleCharacters = () => {
    const femaleCharacters = allCharacters.filter((c) => c.gender === "Female");
    const speciesCounts = femaleCharacters.reduce((counts, c) => {
      const species = c.species;
      counts[species] = (counts[species] || 0) + 1;
      return counts;
    }, {});
    const mostCommonSpecies = Object.keys(speciesCounts).reduce((a, b) =>
      speciesCounts[a] > speciesCounts[b] ? a : b
    );
    return mostCommonSpecies;
  }

  return (
    <Layout title="Stats">
      <div className={Style.container}>
        <div>
          <h3>Top 3 Characters</h3>
          <List items={topThree} />
        </div>
        <div>
          <h3>Most Common Status</h3>
          <p>{getMostCommonStatus()}</p>
        </div>
        <div>
          <h3>The species with the most female characters</h3>
          <p>{getMostCommonSpeciesWithFemaleCharacters()}</p>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/characters')
  const allCharacters = await res.json()

  return {
    props: {
      allCharacters: allCharacters,
    },
  }
}

export default Stats