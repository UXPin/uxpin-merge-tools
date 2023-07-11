import acorn = require('acorn-loose');
import walk = require('acorn-walk');
import debug from 'debug';

const log = debug('uxpin:serialization:jsdoc-parsing');

export function parseUsePortal(tagValue: string) {
  if (tagValue.toLowerCase() === 'false') return false;
  if (tagValue.toLowerCase() === 'true') return true;

  if (!ensureIsValidCondition(tagValue)) {
    throw new Error(
      '@uxpinuseportal annotation should be followed by a valid JavaScript condition using the `props` object'
    );
  }
  return tagValue;
}

export function ensureIsValidCondition(tagValue: string) {
  try {
    const tree = acorn.parse(tagValue, { ecmaVersion: 2020 });

    // Step 1: Reject invalid patterns
    if (!isValidTree(tree)) return false;
    // Step 2: Only accept valid conditions
    return isValidCondition(tree.body);
  } catch (error) {
    throw new Error(`Unable to parse the provided condition: ${tagValue}`);
  }
}

function isValidTree(nodeTree: acorn.ModuleNode) {
  const foundCallExpression = walk.findNodeAt<acorn.CallExpression>(nodeTree, undefined, undefined, 'CallExpression');
  if (foundCallExpression) {
    log(`Invalid "CallExpression" node found: `, (foundCallExpression.node as acorn.CallExpression).callee.name);
    return false;
  }

  return true;
}

function isValidCondition(body: acorn.ModuleNode['body']) {
  if (!body) return false;
  if (body.length !== 1) return false;

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
