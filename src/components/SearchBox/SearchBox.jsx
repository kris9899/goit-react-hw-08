import { useDispatch } from 'react-redux';
import { useState } from 'react';
import css from './SearchBox.module.css';
import { filterContact } from '../../redux/filters/slice';

export default function SearchBox({}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
    dispatch(filterContact(value));
  };
  return (
    <div className={css.searchBox}>
      <label className={css.labelSearchBox}>
        Find contacts by name
        <input
          className={css.inputSearchBox}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
