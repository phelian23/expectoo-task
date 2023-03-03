import React from 'react'
import Link from 'next/link'

import { Character } from '../interfaces'

type Props = {
  data: Character
}

const ListItem = ({ data }: Props) => (
  <Link href="/characters/detail/[id]" as={`/characters/detail/${data.id}`}>
    <p>{data.name}</p>
    <p>{data.status}</p>
  </Link>
)

export default ListItem
