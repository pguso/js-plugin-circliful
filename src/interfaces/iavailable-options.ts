export interface IAvailableOptions {
    id?: string;
    additionalCssClasses?: {}, //TODO for foreground, background, icon, text, etc....
    point?: boolean;
    pointSize?: number;
    percent: number;
    animation?: number;
    animationStep?: number;
    icon?: string;
    text?: string;
    textBelow?: boolean;
    noPercentageSign?: boolean;
    replacePercentageByText?: string;
    halfCircle?: boolean;
    animateInView?: boolean;
    title?: string;
    description?: string;
    strokeLinecap?: string;
    update?: () => {};
    onAnimationEnd?: () => {};
    type?: string;
    strokeGradient?: [string, string];
}
