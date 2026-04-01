import img_noImage from '../assets/no-image-icon-23494.png';
function Card({ imgSrc = null }) {
  return (
    <div>
      <img src={imgSrc ? imgSrc : img_noImage} alt="no image found" />
      <p>Card component</p>
    </div>
  );
}

export default Card;
