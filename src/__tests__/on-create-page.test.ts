import onCreatePage from '../on-create-page'

const createGatsby = ({
  createPage = jest.fn(),
  deletePage = jest.fn(),
  page = {},
  panic = jest.fn(() => { expect('I have valid options.').toBe(true) }),
} = {}) => ({
  boundActionCreators: {
    createPage,
    deletePage,
  },
  page,
  reporter: {
    panic,
  },
})

describe('onCreatePage', () => {
  it('creates a new page/delete old page when replacement is made', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something/' }
    const gatsby = createGatsby({ createPage, deletePage, page })
    const options = { pattern: 'some', replacement: '' }
    const actual = await onCreatePage(gatsby, options)

    expect(createPage).toHaveBeenCalled()
    expect(deletePage).toHaveBeenCalled()
    expect(createPage.mock.calls[0][0]).toMatchSnapshot('createPage')
    expect(deletePage.mock.calls[0][0]).toMatchSnapshot('deletePage')
  })

  it('supports regex for pattern option', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something-sweet/' }
    const gatsby = createGatsby({ createPage, deletePage, page })
    const options = { pattern: /e/g, replacement: undefined }
    const actual = await onCreatePage(gatsby, options)

    expect(createPage).toHaveBeenCalled()
    expect(deletePage).toHaveBeenCalled()
    expect(createPage.mock.calls[0][0]).toMatchSnapshot('createPage')
    expect(deletePage.mock.calls[0][0]).toMatchSnapshot('deletePage')
  })

  it('supports function for replacement option', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something-sweet/' }
    const gatsby = createGatsby({ createPage, deletePage, page })
    const replacement = ( _, match ) => match.toUpperCase()
    const options = { pattern: /(e)/g, replacement }
    const actual = await onCreatePage(gatsby, options)

    expect(createPage).toHaveBeenCalled()
    expect(deletePage).toHaveBeenCalled()
    expect(createPage.mock.calls[0][0]).toMatchSnapshot('createPage')
    expect(deletePage.mock.calls[0][0]).toMatchSnapshot('deletePage')
  })

  it('calls reporter.panic when pattern option is missing', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something-sweet/' }
    const panic = jest.fn(( error ) => error)
    const gatsby = createGatsby({ createPage, deletePage, page, panic })
    const options = { pattern: undefined, replacement: '' }
    const actual = await onCreatePage(gatsby, options)

    expect(panic.mock.calls[0][0]).toMatchSnapshot()
  })

  it('calls reporter.panic when replacement option is missing', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something-sweet/' }
    const panic = jest.fn(( error ) => error)
    const gatsby = createGatsby({ createPage, deletePage, page, panic })
    const options = { pattern: /e/, replacement: null }
    const actual = await onCreatePage(gatsby, options)

    expect(panic.mock.calls[0][0]).toMatchSnapshot()
  })

  it('does nothing when no match found', async () => {
    const createPage = jest.fn()
    const deletePage = jest.fn()
    const page = { path: '/something-sweet/' }
    const gatsby = createGatsby({ createPage, deletePage, page })
    const options = { pattern: /\d/, replacement: '' }
    const actual = await onCreatePage(gatsby, options)

    expect(createPage).not.toHaveBeenCalled()
    expect(deletePage).not.toHaveBeenCalled()
  })
})
