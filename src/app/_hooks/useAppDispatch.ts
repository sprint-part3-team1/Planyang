import { useDispatch } from 'react-redux';
import { AppDispatch } from '../_store/store';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
