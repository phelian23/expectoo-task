import * as React from 'react'

import { Character } from '../interfaces'

type ListDetailProps = {
  item: Character
}

const ListDetail = ({ item: character }: ListDetailProps) => (
  <div>
    <h1>Detail for {character.name}</h1>
    <img src={character.image} alt={character.name} />
    <ul>
      <li>
        <strong>Species:</strong> {character.species}
      </li>
      <li>
        <strong>Status:</strong> {character.status}
      </li>
      <li>
        <strong>Created at:</strong> {character.created}
      </li>
      <li>
        <strong>Gender:</strong> {character.gender}
      </li>
      <li>
        <strong>Location:</strong> {character.location.name}
      </li>
      <li>
        <strong>Episodes:</strong> {character.episode.length}
      </li>
    </ul>
  </div>
)

export default ListDetail
