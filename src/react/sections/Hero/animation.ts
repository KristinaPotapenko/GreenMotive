import gsap from "gsap";

interface AnimationComnfig {
  start: string;
  end?: string;
  y?: number;
  opacity?: number;
  scrub?: boolean;
  ease?: string;
  duration?: number;
}

interface AnimationProps {
  target: gsap.TweenTarget;
  trigger: HTMLElement;
  config: AnimationComnfig;
}

export const animation = ({ target, trigger, config }: AnimationProps) => {
  gsap.fromTo(
    target,
    {
      y: 0,
      opacity: 1,
    },
    {
      scrollTrigger: {
        trigger,
        start: config.start,
        end: config.end || "+=300",
        scrub: config.scrub ?? true,
      },
      y: config.y ?? -100,
      opacity: config.opacity ?? 0,
      ease: config.ease || "power2.out",
      duration: config.duration || 1.5,
    }
  );
};
