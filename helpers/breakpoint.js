import { css } from 'styled-components';
const breakpoints = {
	xs: '576px',
	sm: '768px',
	md: '992px',
	lg: '1200px',
	custom: '1500px',
	custom1: '1400px',
	custom2: '1300px',
}

export const minWidth = Object.keys(breakpoints).reduce((accumulator, label) => {
	accumulator[label] = (...args) => css`
		@media (min-width: ${breakpoints[label]}) {
			${css(...args)};
		}
	`;
	return accumulator;
}, {});

export const maxWidth = Object.keys(breakpoints).reduce((accumulator, label) => {
	accumulator[label] = (...args) => css`
		@media (max-width: ${breakpoints[label]}) {
			${css(...args)};
		}
	`;
	return accumulator;
}, {});