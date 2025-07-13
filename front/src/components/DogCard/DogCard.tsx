import React, { useState } from 'react';
import LikeBtn from '../LikeBtn/LikeBtn';
import './DogCard.css';
import { likeDogAction } from '../../store/actions/dogAction.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import type { IDog } from '../../type.ts';


const DogCard = ({ dog, ref, isLiked }: { dog: IDog, ref: React.Ref<HTMLDivElement>, isLiked: boolean }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [likes, setLikes] = useState(dog.likes);
  return (
    <div className="dog-list__dog" onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)} ref={ref}>
      <div className="dog-list__dog-img">
        {dog.url.includes('mp4') ?
          <video src={dog.url} width={225} height={225} loop={true} autoPlay={true} playsInline={true} />
          :
          <img src={dog.url} alt={'собака'} width={225} height={225} />
        }
      </div>
      {isHover &&
        <div className="dog-list__like-btn">
          Лайкнуло: {likes}
          <LikeBtn isLiked={isLiked} onClick={() => {
            setLikes(likes + 1);
            dispatch(likeDogAction(dog));
          }
          } />
        </div>
      }
    </div>
  );
};

export default DogCard;