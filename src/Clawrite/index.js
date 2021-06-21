import { useState } from "react";
import Canvas from "../Canvas";
import { letters } from "./constants";
import writeString from "./draw";
import Link from '@material-ui/core/Link';
const { h,e,l,o,w,r,d,th } = letters;

const Clawrite = () => {
    const [ranOnce, setOnce] = useState(false);
    const draw = (ctx, frameCount) => {
        if(!ranOnce) {
            writeString(ctx, [h,e,l,l,o,w,o,r,l,d,th]);
            setOnce(true);
        }
    }
    return <div>
        <p>ClaWrite is a fictional language - <Link href="http://www.tomorrowlands.org/draconity/clawrite.html">more information can be found here</Link>.</p>
	    <p>This implementation of ClaWrite was written so that the basic letter construction method could be easily extended (to what end I am no longer sure!).</p>
	    <p>The message printed below is a simple transliteration that reads "helloworld(th)".</p>
        <Canvas draw={ draw } height={ 400 } width={ 600 } />
        <p><small>Originally this was written as a brief learning exercise, intending to use only IE6-compatible JS (as was the style at the time) - where it has been updated, it's only so I could import it into this more modern React project.</small></p>
    </div>;
}

export default Clawrite;
