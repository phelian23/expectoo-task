import * as React from 'react'

import { Character } from '../interfaces'

type ListDetailProps = {
  item: Character
}

const ListDetail = ({ item: character }: ListDetailProps) => {
  const getDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  }

  const getMonth = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date(date).getMonth()];
  }

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${getDay(date)} ${day} ${getMonth(date)} ${year}`;
  }

  return (
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
          <strong>Created at:</strong> {dateHandler(character.created)}
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
}

export default ListDetail
