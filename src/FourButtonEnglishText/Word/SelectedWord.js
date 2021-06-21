import { Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import UpWord from "./UpWord";
import './styles.css';

const SelectedWord = ({ theWord, nextLeft, nextRight, previous, editing, left, right, up}) => {
    const color = editing ? 'secondary' : 'primary';
    const invColor = editing ? 'primary' : 'secondary';
    return editing ?
        <span><Button variant="contained" color={invColor} onClick={left}>{nextLeft}<KeyboardArrowLeftIcon/></Button>
            <Button className="Below" variant="contained" color={color}>{theWord}<UpWord color={invColor} upWord={previous} onClick={up}/></Button>
        <Button variant="contained" color={invColor} onClick={right}><KeyboardArrowRightIcon/>{nextRight}</Button></span> :
        <span><Button variant="contained" color={color}>{theWord}</Button></span>;
}

export default SelectedWord;