import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='border-b flex border-black justify-between'>
        <div className='text-4xl px-2 py-4'>
            Ai 
        </div>
        <button className='px-2 py-4  text-white bg-black'>
            Masuk
        </button>
    </div>
  )
}

export default Header