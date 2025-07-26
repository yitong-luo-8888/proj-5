// components/SubjectsHeader.jsx
import React from 'react'
import { TopicHeader, TopicHeaderRow } from '../styles'

function SubjectsHeader({ categories }) {
  return (
    <TopicHeaderRow>
      {categories.map((cat) => (
        <TopicHeader key={cat}>{cat}</TopicHeader>
      ))}
    </TopicHeaderRow>
  )
}

export default SubjectsHeader