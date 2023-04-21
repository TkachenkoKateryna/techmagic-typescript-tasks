const updateObjectInArray = <T extends Record<string, unknown>>(
	initialArray: T[],
	key: keyof T,
	value: T[keyof T],
	patch: Partial<T>
) => {
	const arr = [...initialArray];
	return arr.map((element) => {
		if (element[key] === value) {
			return { ...element, ...patch };
		}
		return element;
	});
};

type ObjectShape = {
	a: number;
	b: string;
	c: number;
};

const array: ObjectShape[] = [
	{
		a: 1,
		b: "1",
		c: 1,
	},
	{
		a: 2,
		b: "2",
		c: 2,
	},
	{
		a: 3,
		b: "3",
		c: 3,
	},
	{
		a: 4,
		b: "2",
		c: 4,
	},
];

const r = updateObjectInArray<ObjectShape>(array, "b", "2", {
	a: 4,
	c: 1,
});

console.log("result :>> ", r);
