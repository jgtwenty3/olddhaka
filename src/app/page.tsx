import Header from './components/Header';
import { InteractiveCoffeeCup } from './components/InteractiveCoffeeCup';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white md:w-5/6 md:h-4/5 w-4/5 h-2/3 flex justify-center items-center rounded-sm">
          <InteractiveCoffeeCup textureURL='/textures/CupCoffee2_baseColor.png' />
        </div>
      </div>
    </div>
  );
}
