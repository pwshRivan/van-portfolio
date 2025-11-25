const TechIcon = ({ src, alt, className = "w-10 h-10" }) => {
  return (
    <img
      src={src}
      alt={alt}
      width="40"
      height="40"
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
};

export default TechIcon;
