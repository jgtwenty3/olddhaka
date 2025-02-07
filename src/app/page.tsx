import Header from './components/Header';
import { InteractiveCoffeeCup } from './components/InteractiveCoffeeCup';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-cream md:w-5/6 md:h-4/5 w-4/5 h-2/3 flex justify-start md:justify-center items-center rounded-sm shadow-xl shadow-black">
          <div className="flex w-full h-full">
            <div className="w-3/4 m:w-full p-10 md:p-12 flex flex-col">
              <h2 className="text-3xl md:text-9xl font-itcbenguiat text-green">OLD DHAKA</h2>
              <h3 className="text-md -mt-2 md:text-4xl mb-5 font-itcbenguiat text-green md:text-center md:mr-40 md:-mt-8 md:ml-4 ml-8">Coffee House</h3>
              <p className='  md:ml-5 mb-5 md:text-2xl text-green'>
                MONDAYS 10AM - 2PM
              </p>
              <p className='  md:ml-5 mb-5  md:text-2xl text-green'>
                TUESDAYS CLOSED
              </p>
              <p className='  md:ml-5  md:text-2xl text-green'>
                WEDNESDAY-SUNDAY 10AM - 6PM
              </p>
            </div>
            
            <div className=" flex justify-end items-end">
              <InteractiveCoffeeCup textureURL='/textures/texture4.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
