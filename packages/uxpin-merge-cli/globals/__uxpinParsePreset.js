function __uxpinParsePreset(type, props, ...children) {
  const displayName = typeof type === 'function'
    ? type.displayName || type.name || 'Unknown'
    : type;


  return {
    children: children,
    name: displayName,
    props: JSON.parse(JSON.stringify(props)),
    uxpinPresetElementType: 'CodeComponent',
  };
}

global.__uxpinParsePreset = __uxpinParsePreset;
