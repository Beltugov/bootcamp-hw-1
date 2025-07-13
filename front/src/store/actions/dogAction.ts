import { likeDog, loadingDogs, loadingDogsError, loadingDogsSuccessful } from '../slices/dogSlice';
import type { Dispatch } from 'redux';
import type { IDog } from '../../type.ts';

type TAction = {
  type: 'dog/loadingDogs' | 'dog/loadingDogsSuccessful' | 'dog/loadingDogsError' | 'dog/likeDog',
  payload: string | IDog[] | undefined | IDog;
}

const BASE_URL = 'http://localhost:3000/dog';

export const fetchDogs = (page: number) => async (dispatch: Dispatch<TAction>) => {
  dispatch(loadingDogs());
  try {
    const dogs = await fetch(`${BASE_URL}?page=${page}`).then((data) => data.json());
    dispatch(loadingDogsSuccessful(dogs));
  } catch (e) {
    dispatch(loadingDogsError(String(e)));
  }
};

export const likeDogAction = (elem: IDog) => async (dispatch: Dispatch<TAction>) => {
  const dog: IDog = await fetch(`${BASE_URL}/${elem.id}`, {
    method: 'PATCH',
  }).then((data) => data.json());
  dispatch(likeDog(dog));
};

