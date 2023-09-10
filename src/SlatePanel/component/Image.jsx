const Image = (props) => {
  const { attributes, element, children } = props

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div className="h-0 text-transparent outline-none absolute">
          {children}
        </div>
        <img className="block max-w-full min-h-[20rem]" {...attributes} src={element.url || ''} alt='img' />
      </div>
    </div>
  )
}

export default Image