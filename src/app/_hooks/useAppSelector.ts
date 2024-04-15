import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../_store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
