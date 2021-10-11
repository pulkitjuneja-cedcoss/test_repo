import react from 'react'
import { useContext } from 'react';
import { MyHints } from '../../context';
import { Steps, Hints } from 'intro.js-react';

const SavedTemplate = () => {

    const checkbox = useContext(MyHints);

    const hin = [
        { hint: 'First hint', element: '#hint-1', hintButtonLabel: 'OK' },
        { hint: 'Second hint', element: '#hint-2', hintAnimation: false },
       { hint: 'new', element: '.btn', hintAnimation: false, hintPosition:'middle-middle' }
   ];

   const hint = checkbox ? hin : [];

    return(
        <div>
            <Hints enabled={true} hints={hint} />
           Display Saved Templates here
        </div>
    )
}

export default SavedTemplate;