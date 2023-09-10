import { ReactSVG } from "react-svg"
import * as SvgIcon from '../icon'

const ToolBarButton = ({ iconName, onMouseDown }) => {
  const Icon = SvgIcon[iconName]
  return <button
    className='w-6 h-6'
    onMouseDown={onMouseDown}
  >
    <ReactSVG
      src={Icon}
      className="w-full h-full mb-2 cursor-pointer"
    />
  </button>
}

export default ToolBarButton