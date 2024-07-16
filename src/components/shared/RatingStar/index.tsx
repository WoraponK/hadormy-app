// Lib
import React from 'react'

// Images
import { FaStar, FaRegStar } from 'react-icons/fa6'

// Include in project

type Props = {
  rating: number
}

const RatingStar: React.FC<Props> = ({ rating }) => {
  const formatNumberToStar = (rating: number) => {
    if (rating == 5) return '* * * * *'
    else if (rating >= 4) return '* * * * -'
    else if (rating >= 3) return '* * * - -'
    else if (rating >= 2) return '* * - - -'
    else if (rating >= 1) return '* - - - -'
    else if (rating >= 0) return '- - - - -'
    else return '- - - - -'
  }

  return (
    <div className="flex gap-2">
      {formatNumberToStar(rating)
        .split(' ')
        .map((ele, index) => (
          <h4 key={index} className="text-primary">
            {ele === '*' ? <FaStar /> : <FaRegStar />}
          </h4>
        ))}
    </div>
  )
}

export default RatingStar
