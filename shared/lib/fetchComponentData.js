export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    const decComp = current.DecoratedComponent;
    return (current.needs || [])
      .concat((decComp ? decComp.needs : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
