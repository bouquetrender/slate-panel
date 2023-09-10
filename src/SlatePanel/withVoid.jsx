import { VOID_ELEMENT } from "./dict"

const withVoid = (editor) => {
  const { isVoid } = editor
  
  // 将图片节点标记为 void，表示它是一个自包含的、不可编辑的节点
  editor.isVoid = element => {
    return VOID_ELEMENT.includes(element.type) ? true : isVoid(element)
  }

  return editor
}

export default withVoid