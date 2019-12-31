import React from 'react';

const RankedByCount = ({userId, now}) => {
  const {loading, error, data} = useQuery(GET_RECORD_BY_COUNT, {variables: {userId, now}});
  
  if (loading || error) {
    return null;
  }
  
  const {recordsByCount} = data;
  
  if (!recordsByCount.length) {
    return null;
  }
  
  return (
    <>
      <hr className="section-divider"/>
      <article className="ranked-records">
        <div className="title"><strong className="title-strong">많이 간</strong> 음식점 TOP 3!!!</div>
        {
          recordsByCount.slice(0, 3)
            .map(({placeName, count}, index) => (
              <div key={placeName} className="ranked-item">
                <span>{index + 1}. <strong>{placeName}</strong> ( {count}회 )</span>
              </div>
            ))
        }
      </article>
    </>
  );
};

export default RankedByCount;