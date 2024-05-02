
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {
  
    const navigate = useNavigate()
  
    const onButtonClick = () => {
      // You'll update this function later
    }
  
    return (
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <div>Welcome!</div>
        </div>
        <div>This is the home page.</div>
        <div className={'buttonContainer'}>
          <input
            className={'inputButton'}
            type="button"
            onClick={onButtonClick}
            value={false ? 'Log out' : 'Log in'}
          />
          {false ? <div>Your email address is {"sd"}</div> : <div />}
        </div>
      </div>
    )
}
