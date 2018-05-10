import * as module from '..'

describe('gatsby-plugin-replace-path', () => {
  it('exports functions', () => {
    expect(module).toEqual({
      __esModule: true,
      onCreatePage: expect.any(Function),
    })
  })
})
