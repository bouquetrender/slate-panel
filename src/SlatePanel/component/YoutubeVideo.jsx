import YoutubeEmbed from 'react-youtube'

const YoutubeVideo = (props) => {
  const { attributes, children, element } = props

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <YoutubeEmbed contentEditable={false} videoId={element.youtubeId} />
        {children}
      </div>
    </div>
  )
}

export default YoutubeVideo