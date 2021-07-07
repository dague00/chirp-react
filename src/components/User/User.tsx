import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess } from '../../actions/AuthActions';
import { RootStore } from '../../store/store';

export const User: FC = () => {
  const { user, success } = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (success) {
  //     dispatch(setSuccess(''));
  //   }
  // }, [success, dispatch]);
  // console.log('jffjfjf', user);

  return (
    <div>
      <h3>Welcome {user?.username}</h3>
    </div>
  );
};
