import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import { fetchDogs } from '../../store/actions/dogAction.ts';
import DogList from '../../components/DogList/DogList.tsx';


const Main = () => {
  const dogStore = useAppSelector((state) => state.dogReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDogs(1));
  }, []);

  return (
    <DogList arr={dogStore.dogArr} isLoading={dogStore.isLoading} likedList={dogStore.favoriteList} />
  );
};

export default Main;