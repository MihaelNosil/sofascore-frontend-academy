import React, { CSSProperties, useState } from 'react'
import { colors } from "./colors";

const VIEW_BOX_DIMENSION = 600
const DEFAULT_SELECTED_RADIUS = 25

interface Circle {
  x: number
  y: number
  r: number
  color: CSSProperties['color']
}

const getRandomCircleParameters = (r: number): Circle => {
  return {
    x: Math.floor(Math.random() * VIEW_BOX_DIMENSION),
    y: Math.floor(Math.random() * VIEW_BOX_DIMENSION),
    r,
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}
export default function Input() {
  const [currentRadius, setCurrentRadius] = useState(DEFAULT_SELECTED_RADIUS)
  // your task here is to handle an input form in which a user will input one numeric field - radius of their desired circle in your svg
  // Check out next two links for how we handle input forms in React:
  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  // https://www.w3schools.com/react/react_forms.asp
  const [circles, setCircles] = useState<Circle[]>([])

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault() // prevent page changing on submit
    // store new circle in your state and then reset the selector to default radius
    // get your next circle parameters other than radius with `getRandomCircleParameters` method
    setCurrentRadius(DEFAULT_SELECTED_RADIUS)
  }

  return (
    <div style={{margin: '0 auto'}}>
      <form>
        <label> Radius of next circle: {currentRadius}&nbsp;
        <input
          // add onChange method to this input element, which takes form value and sets it into current radius state
          type="range"
          step="1"
          id="radius"
          name="Next circle radius"
          min="0"
          max="150"
          value={currentRadius}
        />
        </label>
        <button type="submit" onClick={onClick}>Add another circle</button>
      </form>
      <svg viewBox={`0 0 ${VIEW_BOX_DIMENSION} ${VIEW_BOX_DIMENSION}`} style={{ width: VIEW_BOX_DIMENSION, height: VIEW_BOX_DIMENSION, border: '1px solid black' }}>
        {/* In this specific case, key is also the id of the circle since we don't delete any */}
        {circles.map((c, index) => <circle key={index} cx={c.x} cy={c.y} r={c.r} fill={c.color}/>)}
      </svg>
    </div>
  )
}
