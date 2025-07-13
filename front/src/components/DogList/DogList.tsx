import { createRef, useEffect, useRef } from 'react';

import './DogList.css';
import { fetchDogs } from '../../store/actions/dogAction.ts';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import type { IDog } from '../../type.ts';
import DogCard from '../DogCard/DogCard.tsx';

const DogList = ({ arr, isLoading, likedList }: { arr: IDog[], isLoading: boolean, likedList: IDog[] }) => {
  const dogStore = useAppSelector((state) => state.dogReducer);
  const lastItem: React.RefObject<HTMLDivElement | null> = createRef();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const observerLoader = useRef<null | IntersectionObserver>(null);
  const page = arr.length / 20 + 1;

  useEffect(() => {
    if (location === '/' && !dogStore.isLoading) {
      if (observerLoader.current) {
        observerLoader.current.disconnect();
      }
      observerLoader.current = new IntersectionObserver((entries) => entries[0].isIntersecting && dispatch(fetchDogs(page)));

      if (lastItem.current) {
        observerLoader.current.observe(lastItem.current as Element);
      }
    }
  }, [lastItem]);

  return (
    <>
      <div className="dog-list">
        {arr && arr.length > 0 ? arr.map((elem, index, array) =>
          <DogCard dog={elem} ref={(index === array.length - 1) ? lastItem : null}
                   isLiked={likedList.find((value) => value.id === (elem.id)) !== undefined} />,
        ) : 'Пока пёсиков нет'}
      </div>
      {isLoading && <div className="loading">"... загружаем еще котиков ..."</div>}
    </>
  );
};

export default DogList;