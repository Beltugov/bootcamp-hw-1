import DogList from '../../components/DogList/DogList.tsx';
import { useAppSelector } from '../../hooks/storeHooks.ts';

const Favorite = () => {
  const store = useAppSelector((state) => state.dogReducer);

  return (
    <DogList arr={store.favoriteList} likedList={store.favoriteList} isLoading={false} />
  );
};

export default Favorite;