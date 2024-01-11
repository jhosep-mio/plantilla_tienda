import { useRef } from 'react'
import JoditEditor from 'jodit-react'
import { type editorValues } from './Interfaces'

export const Editor2 = ({ content, setContent }: editorValues): JSX.Element => {
  const editor = useRef(null)

  const config = {
    readonly: false
  }

  return (
        <JoditEditor
            className='text-gray-300'
            ref={editor}
            value={content}
            config={config}
            // tabIndex={1}
            onBlur={newContent => { setContent(newContent) }}
           // @ts-expect-error: Explanation for disabling TypeScript for this line
            onChange={(newContent) => {}}
        />
  )
}

export default Editor2
