import {selectCurrentLoginUser} from 'features/appSlice';
import {useSelector} from 'react-redux';

export default function useUser() {
  const user = useSelector(selectCurrentLoginUser);
  return {user};
}
