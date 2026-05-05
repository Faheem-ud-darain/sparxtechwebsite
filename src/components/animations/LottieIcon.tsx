import React from 'react';
import LottieReact from 'lottie-react';

interface LottieIconProps {
  animationData: object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const LottieIcon: React.FC<LottieIconProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  style,
}) => {
  // Handle potential CJS/ESM interop issues where the default export is nested
  const Lottie = (LottieReact as any).default || LottieReact;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
};

export default LottieIcon;
