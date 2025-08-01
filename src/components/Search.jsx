import React, { useRef } from 'react'

export default function Search({ onSearch }) {
    const inputRef = useRef(null);
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const value = inputRef.current.value
            if (onSearch) {
                onSearch(value);
            }
        }
    }
    return (
        <div className='top'>
            <h1>电影菜单</h1>
            <input type="text"
                ref={inputRef}
                onKeyDown={handleKeyDown}
                placeholder='搜索'
                autoFocus />
        </div>
    )
}
