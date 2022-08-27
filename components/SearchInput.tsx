import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { colors, getHeaderFontFamily } from '../theme'

type Props = {
  onChangeText?: (input: string) => void
}

export const SearchInput = ({ onChangeText }: Props) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedChangeText = useCallback(
    debounce((input: string) => onChangeText?.(input), 250),
    [onChangeText],
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue],
  )

  const handleClear = useCallback(() => setValue(''), [setValue])

  useEffect(() => {
    debouncedChangeText(value)
  }, [value])

  return (
    <>
      <div className='search-container'>
        <input
          ref={inputRef}
          type='text'
          className='search-input'
          onChange={handleChange}
          value={value}
          placeholder='Search...'
        />

        {value !== '' ? (
          <button className='search-clear' onClick={handleClear}>
            Clear
          </button>
        ) : undefined}

        <div className='search-line' />
      </div>

      <style jsx>{`
        .search-container {
          display: flex;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1 1 85%;
          padding: 0.8em 0em;
          border: 0;
          outline: none;
          font-family: ${getHeaderFontFamily()};
          color: ${colors.black};
        }

        .search-clear {
          flex: 0 0 15%;
          padding: 0.8em 2em;
          border: 0;
          background: transparent;
          font-family: ${getHeaderFontFamily()};
          cursor: pointer;
        }

        .search-line {
          height: 3px;
          width: 100%;
          flex: 0 0 100%;
          background-color: ${colors.lightGrey};
        }

        .search-input:focus ~ .search-line {
          background-color: ${colors.primary};
        }
      `}</style>
    </>
  )
}
