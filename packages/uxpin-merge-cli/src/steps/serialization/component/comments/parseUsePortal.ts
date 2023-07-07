import acorn = require('acorn-loose');

export function parseUsePortal(tagValue: string) {
  if (!parseAsCondition(tagValue)) {
    throw new Error(
      '@uxpinuseportal annotation should be followed by a valid JavaScript condition using the `props` object'
    );
  }
  return tagValue;
}

export function parseAsCondition(tagValue: string) {
  try {
    const tree = acorn.parse(tagValue, { ecmaVersion: 2020 });
    return isCondition(tree.body);
  } catch (error) {
    throw new Error(`Unable to parse the provided condition: ${tagValue}`);
  }
}

function isCondition(body: acorn.ModuleNode['body']) {
  if (!body) return false;
  const node = body[0];

  // a === b
  if (node.type === 'ExpressionStatement' && node.expression.type === 'BinaryExpression') {
    return true;
  }

  // a && b
  if (node.type === 'ExpressionStatement' && node.expression.type === 'LogicalExpression') {
    return true;
  }

  // Ternary
  if (node.type === 'ExpressionStatement' && node.expression.type === 'ConditionalExpression') {
    return true;
  }

  // Boolean
  if (
    node.type === 'ExpressionStatement' &&
    node.expression.type === 'Literal' &&
    ['true', 'false'].includes(node.expression.raw)
  ) {
    return true;
  }

  return false;
}
