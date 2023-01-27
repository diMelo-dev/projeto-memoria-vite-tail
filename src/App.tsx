import { useEffect, useState } from 'react';

//Images
import memoryIcon from './assets/images/memory_icon.png';
import restartIcon from './assets/svgs/restart.svg';

//Components
import { InfoItem } from './Components/InfoItem/InfoItem';
import { Button } from './Components/Button/Button';
import { GridItem } from './Components/GridItem/GridItem';

//Types
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import { Selector } from './Components/Selector/Selector';

function App() {

  let [playing, setPlaying] = useState<boolean>(false);
  let [timeElapsed, setTimeElapsed] = useState<number>(0);
  let [moveCount, setMoveCount] = useState<number>(0);
  let [shownCount, setShownCount] = useState<number>(0);
  let [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreatGrid(), []);


  //Time Counter
  useEffect(() => {
    let timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => {clearInterval(timer)};
  }, [playing, timeElapsed]);

  //Check either both cards are equal
  useEffect(() => {
    if(shownCount === 2) {
      
      let opened = gridItems.filter(item => item.shown === true);
      let tempGrid = [...gridItems];

      if (opened.length === 2) {

        if(opened[0].item === opened[1].item) {

          for(let i in tempGrid) {

            if(tempGrid[i].shown === true) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].shown = false;
            }

          }

          setGridItems(tempGrid);
          setShownCount(0);  

        } else {

          setTimeout(() => {
            for(let i in tempGrid) {
              tempGrid[i].shown = false;
            }
            setGridItems(tempGrid);
            setShownCount(0);
          }, 1000);
          
        }

      }

      setMoveCount(moveCount + 1);

    }
  }, [shownCount, gridItems]);

  //Check the game status
  useEffect(() => {
    
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }

  }, [gridItems]);

  function resetAndCreatGrid() {
      setTimeElapsed(0);
      setMoveCount(0);
      setShownCount(0);

      let tempGrid: GridItemType[] = [];
      for(let i = 0; i < (items.length * 2); i++) {
        tempGrid.push({
          item: null,
          shown: false,
          permanentShown: false,
        });
      }

      for(let w = 0; w < 2; w++) {
        for(let i = 0; i < items.length; i++) {

          let pos = -1;
          while(pos < 0 || tempGrid[pos].item !== null) {
            pos = Math.floor(Math.random() * (items.length * 2));
          }
          tempGrid[pos].item = i;
        }
      }

      setGridItems(tempGrid);

      setPlaying(true);
  }

  function handleItemClick(index: number) {

    if(playing && index !== null && shownCount < 2) {

      if(gridItems[index].permanentShown === false && gridItems[index].shown === false) {
        gridItems[index].shown = true;
        setShownCount(shownCount + 1);
      }

    }

  }

  return (

    <div className='w-full min-h-screen pt-[50px] bg-teal-50 dark:bg-slate-800'>
      <div className="box-border max-w-900 w-full m-auto p-[10px] flex flex-col items-center gap-[20px] md:flex-row">

        <div className='flex flex-col gap-[20px] items-center'>
          
          <div className='w-[70px]'>
            <img src={memoryIcon} className='w-full'/>
          </div>

          <Selector />

          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />

          <InfoItem label='Movimentos' value={moveCount.toString()} />

          <Button label='Reset'  onclick={resetAndCreatGrid}/>

        </div>

        <div className='flex-1 flex justify-center'>
          <div className='grid grid-cols-3 gap-5 sm:gap-10 md:grid-cols-4'>
            {gridItems.map((item, index) => (
              <GridItem 
                key={index} 
                item={item} 
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
