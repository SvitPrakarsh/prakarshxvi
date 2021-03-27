import { useSpring } from 'react-spring';
import { useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const initialBounds = { left: 0, top: 0, width: 0, height: 0 };

function useBoundingClientRect(ref) {
	const [bounds, set] = useState(initialBounds);
	const [ro] = useState(
		() =>
			new ResizeObserver(([entry]) => set(entry.target.getBoundingClientRect()))
	);
	useEffect(() => {
		if (ref.current) ro.observe(ref.current);
		return () => ro.disconnect();
	}, []);
	return bounds;
}

export const use3dEffect = (ref) => {
	const [props, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: { mass: 5, tension: 350, friction: 40 },
	}));
	const { top, left, width, height } = useBoundingClientRect(ref);

	const calc = (x, y) => [
		-((top + height / 2 - y) / (height / 2)) * 10,
		-((left + width / 2 - x) / (width / 2)) * 10,
		1.1,
	];
	const trans = (x, y, s) =>
		`perspective(1000px) rotateX(${x}deg) rotateY(${-y}deg) scale(${s})`;

	return {
		style: {
			transform: props.xys.interpolate(trans),
		},
		onMouseLeave: () => set({ xys: [0, 0, 1] }),
		onMouseMove: ({ pageX: x, pageY: y }) => set({ xys: calc(x, y) }),
	};
};
