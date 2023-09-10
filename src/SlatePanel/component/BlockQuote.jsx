const BlockQuote = (props) => {
  const { attributes, children } = props

  return (
    <div {...attributes}>
      <blockquote className='border-l-2 border-gray-300 pl-3 text-gray-600 italic' {...attributes}>
        {children}
      </blockquote>
    </div>
  )
}

export default BlockQuote