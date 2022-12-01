import React from 'react';
import {CardWrapper, CardTop, CardBottom, Setup, Delivery} from "./styled/index"

interface JokeItemProps {
  joke: Joke[];
}

const JokeItem:React.FC = ({joke}) => {
  return (
    <div>JokeItem</div>
  )
}

export default JokeItem