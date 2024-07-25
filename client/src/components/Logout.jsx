import React from 'react'
import Button from './Button'

const Logout = () => {
  return (
    <div>Logout
      <Button
        className={"bg-red-500"}
        type={"submit"}
        textSize={"1.2rem"}
      >
        Logout
      </Button>
    </div>
  )
}

export default Logout