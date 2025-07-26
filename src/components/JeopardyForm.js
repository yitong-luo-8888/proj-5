import { TotalBox, TopicHeader } from '../styles'
import GameCard from './GameCard'

function JeopardyForm({ categoryMap }) {
  const categories = Object.keys(categoryMap);
  const sortedMap = categories.reduce((acc, cat) => {
    acc[cat] = [...categoryMap[cat]].sort((a, b) => a.points - b.points);
    return acc;
  }, {});

  const levels = sortedMap[categories[0]].map(q => q.points);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
    gridAutoRows: '100px',
    gap: '1rem'
  };

  return (
    <TotalBox style={gridStyle}>
      {/* Headers */}
      {categories.map(cat => <TopicHeader key={cat}>{cat}</TopicHeader>)}

      {/* Cards */}
      {levels.map((_, rowIdx) =>
        categories.map(cat => {
          const q = sortedMap[cat][rowIdx];
          return (
            <GameCard
              key={`${cat}-${q.id}`}       
              question={q}
              index={q.index}     
            />
          );
        })
      )}
    </TotalBox>
  );
}


export default JeopardyForm
