import "./resetButton.css"

export const ResetButton = ({resetBoard}) => {
    return (
      <button className="resetButton" onClick={resetBoard}>
        Reset
      </button>
    )
  }
  
