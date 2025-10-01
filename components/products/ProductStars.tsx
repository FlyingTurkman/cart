'use client'

import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6"













export default function ProductStars({ stars }: { stars: number }) {
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;

            if (stars >= starValue) {
                return <FaStar key={i} className="text-yellow-600"/>
            } else if (stars >= starValue - 0.5) {
                return <FaStarHalfAlt key={i} className="text-yellow-600"/>
            } else {
                return <FaRegStar key={i} className="text-yellow-600"/>
            }
        })
    }

  return <div className="flex flex-row items-center gap-1">{renderStars()}</div>
}