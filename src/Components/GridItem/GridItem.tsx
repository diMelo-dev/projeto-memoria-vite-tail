import { GridItemType } from "../../types/GridItemType"
import memory from '../../assets/svgs/memory.svg';
import { items } from "../../data/items";


type Prop = {
    item: GridItemType,
    onClick: () => void
}

export function GridItem( {item, onClick}: Prop ) {


    return(
        <div className={`bg-sky-500 w-[50px] p-[15px] rounded-2xl cursor-pointer ${(item.permanentShown || item.shown) ? 'bg-sky-600' : 'bg-gray-200'} sm:w-[100px]`} onClick={onClick}>
          {(item.permanentShown === false && item.shown === false) && 
            <img className='w-full opacity-10' src={memory} />
          }

          {(item.permanentShown === true || item.shown === true) && item.item !== null && 
            <img src={items[item.item].icon} />
          }
        </div>
    )
}