@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .animate-pulse-custom {
    animation: pulse-custom 2s infinite;
  }

  @keyframes pulse-custom {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.6;
    }
  }
}
