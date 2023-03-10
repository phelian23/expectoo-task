import * as React from 'react'
import ListItem from './ListItem'
import { Character } from '../interfaces'

type Props = {
  items: Character[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
