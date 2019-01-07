function __uxpinParsePreset(type, props, ...children) {
  const displayName = typeof type === 'function'
    ? type.displayName || type.name || 'Unknown'
    : type;

  return {
    name: displayName,
    props: JSON.parse(JSON.stringify(props)),
    children: children,
  };
}

global.__uxpinParsePreset = __uxpinParsePreset;
