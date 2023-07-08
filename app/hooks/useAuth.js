import {selectCurrentLoginToken} from 'features/appSlice';
import {useSelector} from 'react-redux';

export default function useAuth() {
  const token = useSelector(selectCurrentLoginToken);
  return {token};
}
