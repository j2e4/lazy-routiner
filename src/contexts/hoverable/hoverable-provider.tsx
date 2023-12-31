import { PropsWithChildren } from 'react';
import { HoverableContext } from 'src/contexts/hoverable/hoverable-context';

const HoverableProvider = ({
  children,
  hoverable,
}: PropsWithChildren<{ hoverable: boolean }>) => {
  return (
    <HoverableContext.Provider value={hoverable}>
      {children}
    </HoverableContext.Provider>
  );
};

export default HoverableProvider;
