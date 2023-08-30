import { useState } from "react";
import { Image } from "semantic-ui-react";

function ImageWithFallback({ src, fallbackSrc, alt, result }) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  return result?.image ? (
    <Image
      src={result.image}
      onError={handleImageError}
      alt={alt}
      margin="5vw"
    />
  ) : (
    <Image src={imageSrc} onError={handleImageError} alt={alt} margin="5vw" />
  );
}

export default ImageWithFallback;
