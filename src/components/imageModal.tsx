import { ReactComponent as LeftArrow } from '../assets/arrow-left.svg';
import { ReactComponent as RightArrow } from '../assets/arrow-right.svg';

interface ImageModalProps {
    clickedImg: string;
    handleRotationRight: () => void;
    handleRotationLeft: () => void;
    setClickedImg: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageModal: React.FC<ImageModalProps> = ({clickedImg, handleRotationRight, handleRotationLeft, setClickedImg}) => {

    const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    }

    return <>
    <div className="overlay dismiss" onClick={handleClick}>
        <img className="" src={clickedImg} alt="original size"/>
        <span className="dismiss" onClick={handleClick}>X</span>
        <div onClick={handleRotationRight}>
            <div>
                <RightArrow className="overlay-arrows_right"
                width="50" height="50"/>
            </div>
        </div>
        <div onClick={handleRotationLeft}>
            <div>
                <LeftArrow className="overlay-arrows_left"
                width="50" height="50"/>
            </div>
        </div>
    </div>
    </>;
};

export default ImageModal;
