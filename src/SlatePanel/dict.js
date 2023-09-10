// left
export const ITALIC = 'italic'
export const BOLD = 'bold'

// element
export const BLOCK_QUOTE = 'blockQuote'
export const IMAGE = 'image'
export const YOUTUBE = 'youtube'

// function
export const CLEAR = 'clear'

// localstroage
export const localName = 'rich_text_content'

// regex
export const embedReg = [
  {
    regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
    type: 'youtube'
  },
]


export const INIT_DATA = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: IMAGE,
    children: [{ text: '' }],
    url: 'https://source.unsplash.com/kFrdX5IeQzI'
  },
  {
    type: 'paragraph',
    children: [{ text: "It's a beautiful photo." }],
  },
]


// tailwind style
export const outline_button_css = ''