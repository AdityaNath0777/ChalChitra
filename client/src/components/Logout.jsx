import React from 'react'
import Button from './Button'
import { useUser } from '../contexts'

const Logout = () => {
  const {logoutUser} = useUser()

  return (
    <div>Logout
      <Button
        className={"bg-red-500"}
        type={"submit"}
        textSize={"1.2rem"}
        onClick={logoutUser}
      >
        Logout
      </Button>
    </div>
  )
}

export default Logout