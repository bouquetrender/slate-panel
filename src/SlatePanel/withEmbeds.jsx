const withEmbeds = (editor) => {
  const { insertData } = editor

  editor.insertData = (data) => {
    return insertData(data)
  }

  return editor
}

export default withEmbeds