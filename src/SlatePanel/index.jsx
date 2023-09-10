import { useCallback, useMemo, useState } from 'react'
import { Editor, createEditor, Element as SlateElement, Transforms } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'

import withEmbeds from './withEmbeds'
import * as ElementCompent from './component'
import ToolBarButton from './component/ToolBarButton'
import { INIT_DATA, embedReg, localName } from './dict'

import { BLOCK_QUOTE, BOLD, CLEAR, IMAGE, ITALIC, YOUTUBE } from './dict'

// 特定位置或选定文本范围内添加标记
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

// 文档树节点操作
const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
  )

  let newProperties = {
    type: isActive ? 'paragraph' : format
  }
  Transforms.setNodes(editor, newProperties)
}

// Embed
const activeEmbedFlow = (editor, event) => {
  const text = event.clipboardData.getData('text/plain')
  embedReg.some(({ regex, type }) => {
    const match = text.match(regex)

    if (match) {
      event.preventDefault()

      if (type === YOUTUBE) {
        Transforms.insertNodes(editor, {
          children: [{ text: '' }],
          type,
          youtubeId: match[1]
        })
      }

      return true
    }
    return false
  })
}

const SlatePanel = () => {
  const [editor] = useState(() => withEmbeds(withReact(createEditor())))

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem(localName)) || INIT_DATA,
    []
  )

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const clearText = (editor) => {
    if (!editor) return

    // 检查是否存在焦点
    if (ReactEditor.isFocused(editor)) {
      // 取消焦点
      Transforms.deselect(editor);
    }

    editor.children = [{ type: 'paragraph', children: [{ text: '' }] }];
    editor.onChange();
    localStorage.removeItem(localName);
  }

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={(value) => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        const content = JSON.stringify(value)
        localStorage.setItem(localName, content)
      }
    }}>
      <div className='p-4 bg-white flex border-b-2 justify-between'>
        <div className='flex-1 flex items-center gap-3'>
          <ToolBarButton
            iconName={BOLD}
            onMouseDown={(event) => {
              event.preventDefault()
              toggleMark(editor, BOLD)
            }}
          />
          <ToolBarButton
            iconName={ITALIC}
            onMouseDown={(event) => {
              event.preventDefault()
              toggleMark(editor, ITALIC)
            }}
          />
          <ToolBarButton
            iconName={BLOCK_QUOTE}
            onMouseDown={(event) => {
              event.preventDefault()
              toggleBlock(editor, BLOCK_QUOTE)
            }}
          />
          <ToolBarButton
            iconName={CLEAR}
            onMouseDown={() => {
              clearText(editor)
            }}
          />
        </div>
        <button
          type="button"
          className={'inline-block rounded border-2 px-4 pb-[4px] pt-2 text-xs font-medium border-gray-700'}
          onClick={() => {
            console.log(localStorage.getItem(localName))
          }}>
          SAVE
        </button>
      </div>

      <div className='flex-1 overflow-auto'>
        <Editable
          className='rounded p-4 pt-2 h-[100%]'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onPaste={(event) => {
            activeEmbedFlow(editor, event)
          }}
        />
      </div>
    </Slate>
  )
}

// block -> element
const Element = (props) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case BLOCK_QUOTE:
      return <ElementCompent.BlockQuote {...props} />
    case IMAGE:
      return <ElementCompent.Image {...props} />
    case YOUTUBE:
      return <ElementCompent.YoutubeVideo {...props} />
    default:
      return (
        <p {...attributes}>
          {children}
        </p>
      )
  }
}
// mark -> left
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf[BOLD]) {
    children = <span className='font-bold'>{children}</span>
  }
  if (leaf[ITALIC]) {
    children = <span className='italic'>{children}</span>
  }
  return <span {...attributes}>{children}</span>
}

export default SlatePanel
