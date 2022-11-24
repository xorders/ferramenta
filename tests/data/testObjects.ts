export const simpleNestedObject = {
	n: 1,
	b: true,
	o: {
		s: '2',
		n: 3,
		b: false,
	},
};

interface CircularObjectInterface {
	child?: CircularObjectInterface;
	name: string;
}

const objectA: CircularObjectInterface = {
	name: 'a',
};

const objectB: CircularObjectInterface = {
	child: objectA,
	name: 'b',
};

export const circularObject = () => {
	objectA.child = objectB;
	return objectA;
};
