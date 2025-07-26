import React from 'react'
import { useQuiz } from '../contexts/gameContext'
import { QuestionBox } from '../styles'

function GameCard({ question, type = null, showPointsOnly = true }) {
  const { nextQuestion, answered } = useQuiz()

  const isAnswered = answered.includes(question.id)

  const handleClick = () => {
    if (!isAnswered) {
      nextQuestion(question.id) 
    }
  }

  if (type === 'Answer') {
    return (
      <QuestionBox
        as="div"
        style={{
          width: '60%',
          padding: '2rem',
          fontSize: '1.5rem',
          lineHeight: '1.8rem',
          textAlign: 'center'
        }}
      >
        {question.question}
      </QuestionBox>
    )
  }

  const displayText = showPointsOnly ? `$${question.points}` : question.question

  return (
    <QuestionBox
      onClick={handleClick}
      disabled={isAnswered}
      style={{ cursor: isAnswered ? 'default' : 'pointer' }}
    >
      {displayText}
    </QuestionBox>
  )
}

export default GameCard
