import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './styles.css';

const UpWord = ({ upWord, color, onClick }) => <Button onClick={ onClick } className="Above" variant="contained" color={color}>
    <KeyboardArrowUpIcon/>{upWord}<KeyboardArrowUpIcon/>
</Button>;

export default UpWord;