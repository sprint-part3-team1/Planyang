import { useEffect, useState } from 'react';
import { cardData, cardActions } from '@/app/_slice/cardSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';

const TestColunm = ({ title, deleteColunm, updateColunm, colunmId }) => {
  const [updateInput, setUpdateInput] = useState();
  const dispatch = useAppDispatch();
  const cardDatas = useAppSelector(cardData);
  const colId = colunmId;
  const onUpdateInput = (e) => {
    setUpdateInput(e.target.value);
  };

  return (
    <div>
      <div>{title}</div>
      <button
        type="button"
        onClick={() => {
          deleteColunm(colunmId);
        }}
      >
        칼럼삭제하기
      </button>
      <button
        type="button"
        onClick={() => {
          updateColunm(colunmId, updateInput);
        }}
      >
        칼럼 업데이트 하기
      </button>
      <input value={updateInput} onChange={onUpdateInput} />
    </div>
  );
};

export default TestColunm;
