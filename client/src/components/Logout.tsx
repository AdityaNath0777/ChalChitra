import Button from './Button'
import { useUser } from '../contexts'

const Logout = () => {
  const {logoutUser} = useUser()

  return (
    <div>
      <Button
        className={"bg-red-500 main-font text-xl"}
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