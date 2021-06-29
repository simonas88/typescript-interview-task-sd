type Getter<Container, Value> = (input: Container) => Value
type GetRepeatValues = <Container, Value>(items: Container[], getter: Getter<Container, Value>) => Set<Value>

const getRepeatValues: GetRepeatValues = (items, getter) => {
  const allValues = new Set<ReturnType<typeof getter>>();
  const repeatValues = new Set<ReturnType<typeof getter>>();

  items.forEach(item => {
    const value = getter(item);

    if (allValues.has(value)) {
      repeatValues.add(value);
    } else {
      allValues.add(value);
    }
  });

  return repeatValues;
};

export default getRepeatValues;
