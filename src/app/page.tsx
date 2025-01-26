import Header from './components/Header';
import { InteractiveCoffeeCup } from './components/InteractiveCoffeeCup';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white md:w-5/6 md:h-4/5 w-4/5 h-2/3 flex justify-start md:justify-center items-center rounded-sm shadow-xl shadow-black">
          <div className="flex w-full h-full">
            <div className="w-1/2 flex flex-col p-10 md:p-12">
              <h2 className="text-2xl md:text-8xl mb-5 font-itcbenguiat">OLD DHAKA</h2>
              <p className=' md:ml-5 mb-5'>
                paragrah text
              </p>
              <p className=' md:ml-5'>

                paragrah text
              </p>
            </div>
            
            <div className="w-1/2 flex justify-end items-end">
              <InteractiveCoffeeCup textureURL='/textures/texture4.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
