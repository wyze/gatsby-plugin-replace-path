type Options = {
  pattern: RegExp | string,
  replacement: Function | string,
}

const validate = ({ pattern, replacement }: Options) => {
  if ( !(pattern instanceof RegExp || (typeof pattern === 'string' && pattern.length > 0)) ) {
    return new Error('Must supply `pattern` option as a regex or a string.')
  }

  if ( !(typeof replacement === 'function' || typeof replacement === 'string') ) {
    return new Error('Must supply `replacement` option that is a function or a string.')
  }
}

export { Options }
export default validate
