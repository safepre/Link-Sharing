import { icons } from '../views/Home'

// eslint-disable-next-line react/prop-types
const ModifySVG = ({ fill }) => {
  return (
    <div>
      <img src={icons.gitHubIcon} alt="GitHub Icon" style={{ fill }} />
    </div>
  )
}

export default ModifySVG
