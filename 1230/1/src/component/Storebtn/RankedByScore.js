import React from 'react';
import Rating from "react-rating";

import StarEmpty from '../../../StarEmpty';
import StarFull from '../../../StarFull';


const RankedByScore = ({userId, now}) => {
  const {loading, error, data} = useQuery(GET_RECORD_BY_SCORE, {variables: {userId, now}});
  
  if (loading || error) {
    return null;
  }
  
  const {recordsByScore} = data;
  if (!recordsByScore.length) {
    return null;
  }
  
  const scoredRecords = recordsByScore.filter(({score}) => score > 0);
  if (!scoredRecords.length) {
    return null;
  }
  
  return (
    <>
      <hr className="section-divider"/>
      <article className="ranked-records">
        <div className="title"><strong className="title-strong">평점 높게 준</strong> 음식점 TOP 3!!!</div>
        {
          scoredRecords.slice(0, 3)
            .map(({placeName, score}, index) => (
              <div key={placeName} className="ranked-item">
                <span>{index + 1}.  <strong>{placeName}</strong></span>
                <Rating
                  readonly={true}
                  className="ranked-score"
                  placeholderRating={Math.floor(score)}
                  emptySymbol={<StarEmpty/>}
                  placeholderSymbol={<StarFull/>}
                  fullSymbol={<StarFull/>}
                />
              </div>
            ))
        }
      </article>
    </>
  );
};

export default RankedByScore;