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
        <div className='search-input'>
          <input
            ref={inputRef}
            type='text'
            className='search-input-field'
            onChange={handleChange}
            value={value}
            placeholder='Search...'
            autoCapitalize='off'
            autoCorrect='off'
          />

          <div className='border-line' />
        </div>

        {value !== '' ? (
          <div className='search-clear'>
            <button className='search-clear-btn' onClick={handleClear}>
              Clear
            </button>
          </div>
        ) : undefined}
      </div>

      <style jsx>{`
        .search-container {
          display: flex;
          flex-wrap: nowrap;
          position: relative;
        }

        .search-input {
          flex: 1 1 100%;
          padding: 0.8em 0.5em;
        }

        .search-input-field {
          border: 0;
          outline: none;
          font-family: ${getHeaderFontFamily()};
          font-size: 1em;
          color: ${colors.black};
        }

        .border-line {
          content: '';
          display: block;
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          height: 3px;
          background-color: ${colors.lightGrey};
        }

        .search-input-field:focus + .border-line {
          background-color: ${colors.primary};
        }

        .search-clear {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5em;
          background: transparent;
        }

        .search-clear-btn {
          padding: 0.1em 0.7em;
          border: 0;
          background: transparent;
          cursor: pointer;

          border: 1px solid ${colors.primary};
          border-radius: 1em;

          font-family: ${getHeaderFontFamily()};
          font-size: 0.6em;
          text-transform: uppercase;
          color: ${colors.primary};
        }

        .search-line {
          height: 3px;
          width: 100%;
          flex: 0 0 100%;
          background-color: ${colors.lightGrey};
        }
      `}</style>
    </>
  )
}
