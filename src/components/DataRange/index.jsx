import React from 'react';
import { DateRange } from 'react-date-range';

export default function DataRange({ date, onChangeDate, setIsShowed }) {

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const refDate = React.useRef(null);
    const handleClickOutside = (event) => {
        if (refDate && !refDate.current.contains(event.target)) {
            setIsShowed(false);
        }
    }

    const check = (focus) => {
        focus.indexOf(1) < 0 && setIsShowed(false);
    };
  return (
    <div className='position-absolute' style={{ zIndex: '1' }} ref={refDate}>
        <DateRange
          editableDateInputs={true} 
          onChange={onChangeDate}
          onRangeFocusChange={check}
          ranges={[date]}
          maxDate={new Date()}
          moveRangeOnFirstSelection={false}
        />
    </div>
  )
};
