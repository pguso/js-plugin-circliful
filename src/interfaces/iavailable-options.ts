export interface IAvailableOptions {
    id?: string;
    type?: string;
    additionalCssClasses?: {
        svgContainer?: string,
        backgroundCircle?: string,
        foregroundCircle?: string,
        text?: string,
        icon?: string,
        point?: string,
    }; // TODO for foreground, background, icon, text, etc....
    point?: boolean;
    pointSize?: number;
    percent: number;
    animation?: number;
    animationStep?: number;
    strokeGradient?: [string, string];
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
}
