import { useFocused, useSelected } from "slate-react"

const Image = (props) => {
  const { attributes, element, children } = props
  const selected = useSelected()
  const focused = useFocused()

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        {children}
        <img
          {...attributes}
          className={`block max-w-full min-h-[20rem] ${selected && focused ? 'ring-2 ring-blue-300' : ''}`}
          src={element.url || ''}
          alt='img'
        />
      </div>
    </div>
  )
}

export default Image