import { style } from '@vanilla-extract/css';

export const Container = style({
    position: 'fixed',
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '0.4rem',
    width: '100%',
    maxWidth: '64rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
});

export const Button = style({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',

    selectors: {
        '&:hover': {
            transform: 'scale(1.05)',
        },
        '&:active': {
            transform: 'scale(0.98)',
        },
    },
});