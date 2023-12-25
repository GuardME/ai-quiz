import BikinSoal from './components/BikinSoal'
import Header from './components/Header'
import Main from './components/Main'

export default function Home() {
  return (
    <>
        <Header />
      <div className='mt-4'>
        {/* <Main /> */}
      </div>
      <div className='border-b border-black'>
        <BikinSoal />
      </div>
    </>
  )
}
