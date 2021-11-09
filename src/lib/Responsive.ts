import {
    css,
    CSSObject,
    FlattenSimpleInterpolation,
    SimpleInterpolation,
} from 'styled-components';

export const sp = (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
    @media (max-width: 768px) {
        ${css(first, ...interpolations)}
    }
`;

export const pc = (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
    @media (min-width: 769px) {
        ${css(first, ...interpolations)}
    }
`;