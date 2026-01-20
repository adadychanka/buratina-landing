'use client';

import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils/scroll';

interface ScrollToButtonProps extends Omit<ButtonProps, 'onClick'> {
  targetId: string;
  headerOffset?: number;
}

/**
 * Client component button that scrolls to a section
 * Can be used in server components
 */
export function ScrollToButton({
  targetId,
  headerOffset = 80,
  children,
  ...props
}: ScrollToButtonProps) {
  const handleClick = () => {
    scrollToSection(targetId, headerOffset);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
